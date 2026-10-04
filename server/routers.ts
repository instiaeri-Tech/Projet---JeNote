import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  addConversationTurn,
  createConversationSession,
  createNote,
  exportUserData,
  getAdminStats,
  getConversation,
  getDashboardStats,
  getNote,
  getTodayReviews,
  listNotes,
  logSecurityEvent,
  recordAttempt,
  saveLearningResource,
  softDeleteNote,
  toggleFavorite,
  updateNoteStatus,
} from "./db";
import { generateConversationReply, generateLearningResource } from "./services/learning";
import { authenticateLocalAccount, clearLocalSession, createLocalAccount, setLocalSession } from "./_core/localAuth";

const noteInput = z.object({
  sourceText: z.string().trim().min(8, "Écrivez une situation un peu plus précise." ).max(2000),
  context: z.string().min(1).max(40),
  sourceLanguage: z.string().min(2).max(12),
  targetLanguage: z.string().min(2).max(12),
  level: z.enum(["essentiel", "standard", "defi"]),
});

export const appRouter = router({
  system: router({
    health: publicProcedure.query(() => ({ ok: true })),
  }),
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    register: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(120), email: z.string().email(), password: z.string().min(8).max(200) })).mutation(async ({ ctx, input }) => {
      try {
        const user = await createLocalAccount(input);
        if (!user) throw new Error("Le compte n’a pas pu être créé.");
        await setLocalSession(ctx.res, user);
        return user;
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Inscription impossible." });
      }
    }),
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1).max(200) })).mutation(async ({ ctx, input }) => {
      const user = await authenticateLocalAccount(input.email, input.password);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Adresse email ou mot de passe incorrect." });
      await setLocalSession(ctx.res, user);
      return user;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      clearLocalSession(ctx.res);
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    stats: protectedProcedure.query(({ ctx }) => getDashboardStats(ctx.user.id)),
  }),
  notes: router({
    list: protectedProcedure.input(z.object({ search: z.string().optional(), context: z.string().optional() }).optional()).query(({ ctx, input }) => listNotes(ctx.user.id, input)),
    get: protectedProcedure.input(z.object({ id: z.number().int().positive() })).query(({ ctx, input }) => getNote(ctx.user.id, input.id)),
    create: protectedProcedure.input(noteInput).mutation(({ ctx, input }) => createNote({ userId: ctx.user.id, ...input })),
    generate: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const detail = await getNote(ctx.user.id, input.id);
      if (!detail) throw new TRPCError({ code: "NOT_FOUND", message: "Note introuvable." });
      if (detail.note.sourceText.trim().length < 12) {
        await updateNoteStatus(ctx.user.id, input.id, "needs_clarification");
        return { status: "needs_clarification" as const, question: "Que souhaitez-vous faire ou comprendre, et dans quelle situation précise ?" };
      }
      try {
        const resource = await generateLearningResource({
          sourceText: detail.note.sourceText,
          sourceLanguage: detail.note.sourceLanguage,
          targetLanguage: detail.note.targetLanguage,
          context: detail.note.context,
          level: detail.note.level,
        });
        await logSecurityEvent({ userId: ctx.user.id, action: "learning.generate", outcome: "success", metadata: { noteId: input.id } });
        return { status: "ready" as const, detail: await saveLearningResource({ userId: ctx.user.id, noteId: input.id, ...resource }) };
      } catch (error) {
        await updateNoteStatus(ctx.user.id, input.id, "error");
        await logSecurityEvent({ userId: ctx.user.id, action: "learning.generate", outcome: "error", metadata: { noteId: input.id } });
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error instanceof Error ? error.message : "La génération pédagogique a échoué." });
      }
    }),
    toggleFavorite: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => toggleFavorite(ctx.user.id, input.id)),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => softDeleteNote(ctx.user.id, input.id)),
  }),
  practice: router({
    submit: protectedProcedure.input(z.object({
      exerciseId: z.number().int().positive(),
      answerGiven: z.string().trim().min(1).max(1000),
      feedback: z.string().min(1).max(3000),
      errorType: z.string().max(64).optional(),
      isCorrect: z.boolean(),
      durationSeconds: z.number().int().min(0).max(3600).optional(),
    })).mutation(({ ctx, input }) => recordAttempt({ userId: ctx.user.id, ...input })),
  }),
  review: router({
    today: protectedProcedure.query(({ ctx }) => getTodayReviews(ctx.user.id)),
  }),
  conversation: router({
    start: protectedProcedure.input(z.object({ noteId: z.number().int().positive().optional(), scenario: z.string().min(1).max(64), level: z.enum(["essentiel", "standard", "defi"]) })).mutation(({ ctx, input }) => createConversationSession({ userId: ctx.user.id, ...input })),
    get: protectedProcedure.input(z.object({ sessionId: z.number().int().positive() })).query(({ ctx, input }) => getConversation(ctx.user.id, input.sessionId)),
    reply: protectedProcedure.input(z.object({ sessionId: z.number().int().positive(), message: z.string().trim().min(1).max(1200) })).mutation(async ({ ctx, input }) => {
      const conversation = await getConversation(ctx.user.id, input.sessionId);
      if (!conversation) throw new TRPCError({ code: "NOT_FOUND", message: "Conversation introuvable." });
      const reply = await generateConversationReply({ scenario: conversation.session.scenario, level: conversation.session.level, note: "", history: conversation.turns, message: input.message });
      await addConversationTurn({ userId: ctx.user.id, sessionId: input.sessionId, role: "user", content: input.message });
      await addConversationTurn({ userId: ctx.user.id, sessionId: input.sessionId, role: "assistant", content: reply });
      return { reply };
    }),
  }),
  account: router({
    exportData: protectedProcedure.query(({ ctx }) => exportUserData(ctx.user.id)),
  }),
  admin: router({
    stats: adminProcedure.query(() => getAdminStats()),
  }),
});

export type AppRouter = typeof appRouter;
