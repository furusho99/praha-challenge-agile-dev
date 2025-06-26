import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
  primaryKey,
  foreignKey,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

// ユーザーステータスのテーブル
export const usersStatusTable = pgTable("users_status", {
  status: varchar("status", { length: 50 }).primaryKey(),
});

// シーズンテーブル
export const seasonsTable = pgTable("seasons", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// チームテーブル
export const teamsTable = pgTable("teams", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  seasonId: uuid("season_id")
    .notNull()
    .references(() => seasonsTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ユーザーテーブル
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  teamId: uuid("team_id").references(() => teamsTable.id),
  isAdministrator: boolean("is_administrator").notNull(),
  status: varchar("status", { length: 50 }).references(
    () => usersStatusTable.status,
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ジャンルテーブル
export const genreTable = pgTable("genre", {
  name: varchar("name", { length: 100 }).primaryKey(),
});

// 課題テーブル
export const assignmentsTable = pgTable(
  "assignments",
  {
    id: uuid("id").notNull(),
    version: integer("version").default(1).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    genre: varchar("genre", { length: 100 })
      .notNull()
      .references(() => genreTable.name),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.id, table.version] })],
);

// 課題ステータステーブル
export const assignmentStatusTable = pgTable("assignment_status", {
  status: varchar("status", { length: 50 }).primaryKey(),
});

// ユーザー課題関連テーブル
export const usersAssignmentsTable = pgTable(
  "users_assignments",
  {
    usersId: uuid("users_id")
      .notNull()
      .references(() => usersTable.id),
    assignmentsId: uuid("assignments_id").notNull(),
    status: varchar("status", { length: 50 }).references(
      () => assignmentStatusTable.status,
    ),
    isPublic: boolean("is_public").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    // 複合主キー
    primaryKey({ columns: [table.usersId, table.assignmentsId] }),
  ],
);

// チーム課題関連テーブル
export const teamsAssignmentsTable = pgTable(
  "teams_assignments",
  {
    teamsId: uuid("teams_id")
      .notNull()
      .references(() => teamsTable.id),
    assignmentsId: uuid("assignments_id").notNull(),
    isPublic: boolean("is_public").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    // 複合主キー
    primaryKey({ columns: [table.teamsId, table.assignmentsId] }),
  ],
);

// 新規課題公開リクエストステータステーブル
export const newAssignmentStatusTable = pgTable("new_assignment_status", {
  status: varchar("status", { length: 50 }).primaryKey(),
});

// 新規課題公開リクエストテーブル
export const newAssignmentPublicRequestsTable = pgTable(
  "new_assignment_public_requests",
  {
    id: uuid("id").primaryKey(),
    userId: uuid("user_id").references(() => usersTable.id),
    status: varchar("status", { length: 50 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    // 外部キー名が長すぎるとエラーになるため、明示的に指定
    foreignKey({
      columns: [table.status],
      foreignColumns: [newAssignmentStatusTable.status],
      name: "assignment_public_requests_status_fkey",
    }),
  ],
);
