import { and, asc, count, desc, eq, isNull, like, lte, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  conversationSessions,
  conversationTurns,
  entitlements,
  exerciseAttempts,
  exercises,
  learningResources,
  notes,
  reviewItems,
  securityEvents,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

function requireDb<T>(db: T | null): T {
  if (!db) throw new Error("Database is not available");
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = requireDb(await getDb());
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "passwordHash", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  updateSet.lastSignedIn ??= new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

export async function createNote(input: {
  userId: number;
  sourceText: string;
  context: string;
  sourceLanguage: string;
  targetLanguage: string;
  level: "essentiel" | "standard" | "defi";
}) {
  const db = requireDb(await getDb());
  const result = await db.insert(notes).values(input);
  const id = Number(result[0].insertId);
  return getNote(input.userId, id);
}

export async function updateNoteStatus(userId: number, noteId: number, status: "draft" | "ready" | "needs_clarification" | "error") {
  const db = requireDb(await getDb());
  await db.update(notes).set({ status, updatedAt: new Date() }).where(and(eq(notes.id, noteId), eq(notes.userId, userId)));
}

export async function listNotes(userId: number, filters?: { search?: string; context?: string }) {
  const db = requireDb(await getDb());
  const clauses = [eq(notes.userId, userId), isNull(notes.deletedAt)];
  if (filters?.context && filters.context !== "Tous") clauses.push(eq(notes.context, filters.context));
  if (filters?.search?.trim()) {
    const term = `%${filters.search.trim()}%`;
    clauses.push(or(like(notes.sourceText, term), like(notes.tags, term))!);
  }
  return db.select().from(notes).where(and(...clauses)).orderBy(desc(notes.updatedAt)).limit(50);
}

export async function getNote(userId: number, noteId: number) {
  const db = requireDb(await getDb());
  const note = (await db.select().from(notes).where(and(eq(notes.id, noteId), eq(notes.userId, userId), isNull(notes.deletedAt))).limit(1))[0];
  if (!note) return null;
  const resource = (await db.select().from(learningResources).where(and(eq(learningResources.noteId, noteId), eq(learningResources.userId, userId))).limit(1))[0] ?? null;
  const resourceExercises = resource
    ? await db.select().from(exercises).where(and(eq(exercises.resourceId, resource.id), eq(exercises.userId, userId))).orderBy(asc(exercises.position))
    : [];
  return { note, resource, exercises: resourceExercises };
}

export async function saveLearningResource(input: {
  userId: number;
  noteId: number;
  targetExpression: string;
  variants: string[];
  explanation: string;
  vocabulary: Array<{ word: string; meaning: string; example: string }>;
  grammarPoint: string;
  difficulty: number;
  exercises: Array<{ type: string; prompt: string; answer: string; options: string[]; skill: string }>;
}) {
  const db = requireDb(await getDb());
  await db.transaction(async tx => {
    const existing = (await tx.select().from(learningResources).where(and(eq(learningResources.noteId, input.noteId), eq(learningResources.userId, input.userId))).limit(1))[0];
    let resourceId: number;
    if (existing) {
      resourceId = existing.id;
      await tx.update(learningResources).set({
        targetExpression: input.targetExpression,
        variants: JSON.stringify(input.variants),
        explanation: input.explanation,
        vocabulary: JSON.stringify(input.vocabulary),
        grammarPoint: input.grammarPoint,
        difficulty: input.difficulty,
        createdAt: new Date(),
      }).where(eq(learningResources.id, existing.id));
      const oldExercises = await tx.select({ id: exercises.id }).from(exercises).where(and(eq(exercises.resourceId, existing.id), eq(exercises.userId, input.userId)));
      for (const oldExercise of oldExercises) {
        await tx.delete(exerciseAttempts).where(and(eq(exerciseAttempts.exerciseId, oldExercise.id), eq(exerciseAttempts.userId, input.userId)));
        await tx.delete(reviewItems).where(and(eq(reviewItems.exerciseId, oldExercise.id), eq(reviewItems.userId, input.userId)));
      }
      await tx.delete(exercises).where(and(eq(exercises.resourceId, existing.id), eq(exercises.userId, input.userId)));
    } else {
      const inserted = await tx.insert(learningResources).values({
        userId: input.userId,
        noteId: input.noteId,
        targetExpression: input.targetExpression,
        variants: JSON.stringify(input.variants),
        explanation: input.explanation,
        vocabulary: JSON.stringify(input.vocabulary),
        grammarPoint: input.grammarPoint,
        difficulty: input.difficulty,
        promptVersion: "v1",
      });
      resourceId = Number(inserted[0].insertId);
    }
    for (const [position, exercise] of input.exercises.entries()) {
      const inserted = await tx.insert(exercises).values({
        resourceId,
        userId: input.userId,
        type: exercise.type,
        prompt: exercise.prompt,
        answer: exercise.answer,
        options: JSON.stringify(exercise.options),
        skill: exercise.skill,
        position,
      });
      const exerciseId = Number(inserted[0].insertId);
      await tx.insert(reviewItems).values({
        userId: input.userId,
        exerciseId,
        dueAt: new Date(),
        intervalDays: 1,
        difficulty: input.difficulty,
      });
    }
    await tx.update(notes).set({ status: "ready", updatedAt: new Date() }).where(and(eq(notes.id, input.noteId), eq(notes.userId, input.userId)));
  });
  return getNote(input.userId, input.noteId);
}

export async function toggleFavorite(userId: number, noteId: number) {
  const db = requireDb(await getDb());
  const current = (await db.select({ value: notes.isFavorite }).from(notes).where(and(eq(notes.id, noteId), eq(notes.userId, userId), isNull(notes.deletedAt))).limit(1))[0];
  if (!current) return null;
  await db.update(notes).set({ isFavorite: !current.value, updatedAt: new Date() }).where(and(eq(notes.id, noteId), eq(notes.userId, userId)));
  return { isFavorite: !current.value };
}

export async function softDeleteNote(userId: number, noteId: number) {
  const db = requireDb(await getDb());
  await db.update(notes).set({ deletedAt: new Date(), updatedAt: new Date() }).where(and(eq(notes.id, noteId), eq(notes.userId, userId)));
  return { success: true } as const;
}

export async function getDashboardStats(userId: number) {
  const db = requireDb(await getDb());
  const [noteCount, readyCount, dueCount, attemptCount] = await Promise.all([
    db.select({ value: count() }).from(notes).where(and(eq(notes.userId, userId), isNull(notes.deletedAt))),
    db.select({ value: count() }).from(notes).where(and(eq(notes.userId, userId), eq(notes.status, "ready"), isNull(notes.deletedAt))),
    db.select({ value: count() }).from(reviewItems).where(and(eq(reviewItems.userId, userId), lte(reviewItems.dueAt, new Date()))),
    db.select({ value: count() }).from(exerciseAttempts).where(eq(exerciseAttempts.userId, userId)),
  ]);
  const reviews = await db.select({ difficulty: reviewItems.difficulty, lastResult: reviewItems.lastResult }).from(reviewItems).where(eq(reviewItems.userId, userId)).limit(100);
  const mastered = reviews.filter(item => item.lastResult === true && item.difficulty <= 3).length;
  const progress = Math.min(100, Math.round((mastered / Math.max(1, reviews.length)) * 100));
  return {
    notes: Number(noteCount[0]?.value ?? 0),
    ready: Number(readyCount[0]?.value ?? 0),
    due: Number(dueCount[0]?.value ?? 0),
    attempts: Number(attemptCount[0]?.value ?? 0),
    progress,
  };
}

export async function getTodayReviews(userId: number) {
  const db = requireDb(await getDb());
  const rows = await db.select({
    review: reviewItems,
    exercise: exercises,
    resource: learningResources,
    note: notes,
  })
    .from(reviewItems)
    .innerJoin(exercises, eq(reviewItems.exerciseId, exercises.id))
    .innerJoin(learningResources, eq(exercises.resourceId, learningResources.id))
    .innerJoin(notes, eq(learningResources.noteId, notes.id))
    .where(and(eq(reviewItems.userId, userId), lte(reviewItems.dueAt, new Date()), isNull(notes.deletedAt)))
    .orderBy(asc(reviewItems.dueAt))
    .limit(12);
  return rows;
}

export async function recordAttempt(input: {
  userId: number;
  exerciseId: number;
  answerGiven: string;
  feedback: string;
  errorType?: string;
  isCorrect: boolean;
  durationSeconds?: number;
}) {
  const db = requireDb(await getDb());
  await db.insert(exerciseAttempts).values(input);
  const current = (await db.select().from(reviewItems).where(and(eq(reviewItems.userId, input.userId), eq(reviewItems.exerciseId, input.exerciseId))).limit(1))[0];
  if (current) {
    const intervalDays = input.isCorrect ? Math.min(30, Math.max(1, current.intervalDays * 2)) : 1;
    const dueAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);
    await db.update(reviewItems).set({ intervalDays, dueAt, lastResult: input.isCorrect, updatedAt: new Date() }).where(eq(reviewItems.id, current.id));
  }
  return { success: true, nextIntervalDays: input.isCorrect ? Math.min(30, Math.max(1, (current?.intervalDays ?? 1) * 2)) : 1 } as const;
}

export async function createConversationSession(input: { userId: number; noteId?: number; scenario: string; level: "essentiel" | "standard" | "defi" }) {
  const db = requireDb(await getDb());
  const inserted = await db.insert(conversationSessions).values(input);
  const id = Number(inserted[0].insertId);
  await db.insert(conversationTurns).values({
    sessionId: id,
    userId: input.userId,
    role: "assistant",
    content: "Je joue le rôle de votre interlocuteur. Répondez naturellement ; je vous aiderai ensuite à reformuler.",
  });
  return id;
}

export async function getConversation(userId: number, sessionId: number) {
  const db = requireDb(await getDb());
  const session = (await db.select().from(conversationSessions).where(and(eq(conversationSessions.id, sessionId), eq(conversationSessions.userId, userId))).limit(1))[0];
  if (!session) return null;
  const turns = await db.select().from(conversationTurns).where(and(eq(conversationTurns.sessionId, sessionId), eq(conversationTurns.userId, userId))).orderBy(asc(conversationTurns.createdAt));
  return { session, turns };
}

export async function addConversationTurn(input: { userId: number; sessionId: number; role: "user" | "assistant" | "feedback"; content: string }) {
  const db = requireDb(await getDb());
  await db.insert(conversationTurns).values(input);
  await db.update(conversationSessions).set({ updatedAt: new Date() }).where(and(eq(conversationSessions.id, input.sessionId), eq(conversationSessions.userId, input.userId)));
}

export async function logSecurityEvent(input: { userId?: number; action: string; outcome: string; metadata?: Record<string, unknown> }) {
  const db = await getDb();
  if (!db) return;
  await db.insert(securityEvents).values({ ...input, metadata: input.metadata ? JSON.stringify(input.metadata) : null });
}

export async function exportUserData(userId: number) {
  const db = requireDb(await getDb());
  const [user, userNotes, resources, attempts, conversations] = await Promise.all([
    db.select({ id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt }).from(users).where(eq(users.id, userId)).limit(1),
    db.select().from(notes).where(eq(notes.userId, userId)),
    db.select().from(learningResources).where(eq(learningResources.userId, userId)),
    db.select().from(exerciseAttempts).where(eq(exerciseAttempts.userId, userId)),
    db.select().from(conversationSessions).where(eq(conversationSessions.userId, userId)),
  ]);
  return { exportedAt: new Date().toISOString(), user: user[0] ?? null, notes: userNotes, learningResources: resources, attempts, conversations };
}

export async function getAdminStats() {
  const db = requireDb(await getDb());
  const [userCount, noteCount, resourceCount, attemptCount] = await Promise.all([
    db.select({ value: count() }).from(users),
    db.select({ value: count() }).from(notes).where(isNull(notes.deletedAt)),
    db.select({ value: count() }).from(learningResources),
    db.select({ value: count() }).from(exerciseAttempts),
  ]);
  return {
    users: Number(userCount[0]?.value ?? 0),
    notes: Number(noteCount[0]?.value ?? 0),
    resources: Number(resourceCount[0]?.value ?? 0),
    attempts: Number(attemptCount[0]?.value ?? 0),
  };
}
