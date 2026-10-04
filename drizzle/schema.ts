import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: text("passwordHash"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const notes = mysqlTable(
  "notes",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id),
    sourceText: text("sourceText").notNull(),
    context: varchar("context", { length: 40 }).notNull().default("autre"),
    sourceLanguage: varchar("sourceLanguage", { length: 12 }).notNull().default("fr"),
    targetLanguage: varchar("targetLanguage", { length: 12 }).notNull().default("en"),
    level: mysqlEnum("level", ["essentiel", "standard", "defi"]).notNull().default("standard"),
    status: mysqlEnum("status", ["draft", "ready", "needs_clarification", "error"]).notNull().default("draft"),
    tags: text("tags"),
    isFavorite: boolean("isFavorite").notNull().default(false),
    deletedAt: timestamp("deletedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userUpdatedIdx: index("notes_user_updated_idx").on(table.userId, table.updatedAt),
    userStatusIdx: index("notes_user_status_idx").on(table.userId, table.status),
  })
);

export const learningResources = mysqlTable(
  "learning_resources",
  {
    id: int("id").autoincrement().primaryKey(),
    noteId: int("noteId").notNull().references(() => notes.id),
    userId: int("userId").notNull().references(() => users.id),
    targetExpression: text("targetExpression").notNull(),
    variants: text("variants").notNull(),
    explanation: text("explanation").notNull(),
    vocabulary: text("vocabulary").notNull(),
    grammarPoint: text("grammarPoint").notNull(),
    difficulty: int("difficulty").notNull().default(2),
    promptVersion: varchar("promptVersion", { length: 32 }).notNull().default("v1"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    noteIdx: uniqueIndex("resources_note_unique").on(table.noteId),
    userCreatedIdx: index("resources_user_created_idx").on(table.userId, table.createdAt),
  })
);

export const exercises = mysqlTable(
  "exercises",
  {
    id: int("id").autoincrement().primaryKey(),
    resourceId: int("resourceId").notNull().references(() => learningResources.id),
    userId: int("userId").notNull().references(() => users.id),
    type: varchar("type", { length: 32 }).notNull().default("recall"),
    prompt: text("prompt").notNull(),
    answer: text("answer").notNull(),
    options: text("options"),
    skill: varchar("skill", { length: 32 }).notNull().default("expression"),
    position: int("position").notNull().default(0),
  },
  table => ({
    resourceIdx: index("exercises_resource_idx").on(table.resourceId),
    userIdx: index("exercises_user_idx").on(table.userId),
  })
);

export const exerciseAttempts = mysqlTable(
  "exercise_attempts",
  {
    id: int("id").autoincrement().primaryKey(),
    exerciseId: int("exerciseId").notNull().references(() => exercises.id),
    userId: int("userId").notNull().references(() => users.id),
    answerGiven: text("answerGiven").notNull(),
    feedback: text("feedback").notNull(),
    errorType: varchar("errorType", { length: 64 }),
    isCorrect: boolean("isCorrect").notNull(),
    durationSeconds: int("durationSeconds"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    userCreatedIdx: index("attempts_user_created_idx").on(table.userId, table.createdAt),
    exerciseIdx: index("attempts_exercise_idx").on(table.exerciseId),
  })
);

export const reviewItems = mysqlTable(
  "review_items",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id),
    exerciseId: int("exerciseId").notNull().references(() => exercises.id),
    dueAt: timestamp("dueAt").notNull(),
    intervalDays: int("intervalDays").notNull().default(1),
    difficulty: int("difficulty").notNull().default(2),
    lastResult: boolean("lastResult"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userDueIdx: index("reviews_user_due_idx").on(table.userId, table.dueAt),
    exerciseUnique: uniqueIndex("reviews_exercise_unique").on(table.userId, table.exerciseId),
  })
);

export const conversationSessions = mysqlTable(
  "conversation_sessions",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id),
    noteId: int("noteId").references(() => notes.id),
    scenario: varchar("scenario", { length: 64 }).notNull(),
    level: mysqlEnum("level", ["essentiel", "standard", "defi"]).notNull().default("standard"),
    status: mysqlEnum("status", ["active", "completed"]).notNull().default("active"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userUpdatedIdx: index("conversation_user_updated_idx").on(table.userId, table.updatedAt),
  })
);

export const conversationTurns = mysqlTable(
  "conversation_turns",
  {
    id: int("id").autoincrement().primaryKey(),
    sessionId: int("sessionId").notNull().references(() => conversationSessions.id),
    userId: int("userId").notNull().references(() => users.id),
    role: mysqlEnum("role", ["user", "assistant", "feedback"]).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    sessionIdx: index("conversation_turns_session_idx").on(table.sessionId, table.createdAt),
  })
);

export const securityEvents = mysqlTable(
  "security_events",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").references(() => users.id),
    action: varchar("action", { length: 80 }).notNull(),
    outcome: varchar("outcome", { length: 32 }).notNull(),
    metadata: text("metadata"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    createdIdx: index("security_events_created_idx").on(table.createdAt),
  })
);

export const entitlements = mysqlTable(
  "entitlements",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id),
    plan: mysqlEnum("plan", ["free", "premium", "team"]).notNull().default("free"),
    monthlyGenerations: int("monthlyGenerations").notNull().default(10),
    usedGenerations: int("usedGenerations").notNull().default(0),
    renewsAt: timestamp("renewsAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userUnique: uniqueIndex("entitlements_user_unique").on(table.userId),
  })
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type LearningResource = typeof learningResources.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type ReviewItem = typeof reviewItems.$inferSelect;
