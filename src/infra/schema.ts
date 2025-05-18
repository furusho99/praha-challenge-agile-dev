import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';

// ユーザーステータスのテーブル
export const usersStatusTable = pgTable('users_status', {
  status: varchar('status', { length: 50 }).primaryKey(),
});

// ユーザーテーブル
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  season: integer('season').notNull(),
  isAdministrator: boolean('is_administrator').notNull(),
  status: varchar('status', { length: 50 }).references(
    () => usersStatusTable.status
  ),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ジャンルテーブル
export const genreTable = pgTable('genre', {
  name: varchar('name', { length: 100 }).primaryKey(),
});

// 課題テーブル
export const assignmentsTable = pgTable('assignments', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  genre: varchar('genre', { length: 100 }).references(() => genreTable.name),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// 課題ステータステーブル
export const assignmentStatusTable = pgTable('assignment_status', {
  status: varchar('status', { length: 50 }).primaryKey(),
});

// ユーザー課題関連テーブル
export const usersAssignmentsTable = pgTable(
  'users_assignments',
  {
    usersId: integer('users_id')
      .notNull()
      .references(() => usersTable.id),
    assignmentsId: integer('assignments_id')
      .notNull()
      .references(() => assignmentsTable.id),
    status: varchar('status', { length: 50 }).references(
      () => assignmentStatusTable.status
    ),
    isPublic: boolean('is_public').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    // 複合主キー
    primaryKey({ columns: [table.usersId, table.assignmentsId] }),
  ]
);

// 新規課題公開リクエストステータステーブル
export const newAssignmentStatusTable = pgTable('new_assignment_status', {
  status: varchar('status', { length: 50 }).primaryKey(),
});

// 新規課題公開リクエストテーブル
export const newAssignmentPublicRequestsTable = pgTable(
  'new_assignment_public_requests',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => usersTable.id),
    status: varchar('status', { length: 50 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    // 外部キー名が長すぎるとエラーになるため、明示的に指定
    foreignKey({
      columns: [table.status],
      foreignColumns: [newAssignmentStatusTable.status],
      name: 'assignment_public_requests_status_fkey',
    }),
  ]
);

export type InsertUserStatus = typeof usersStatusTable.$inferInsert;
export type SelectUserStatus = typeof usersStatusTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertGenre = typeof genreTable.$inferInsert;
export type SelectGenre = typeof genreTable.$inferSelect;

export type InsertAssignment = typeof assignmentsTable.$inferInsert;
export type SelectAssignment = typeof assignmentsTable.$inferSelect;

export type InsertAssignmentStatus = typeof assignmentStatusTable.$inferInsert;
export type SelectAssignmentStatus = typeof assignmentStatusTable.$inferSelect;

export type InsertUsersAssignment = typeof usersAssignmentsTable.$inferInsert;
export type SelectUsersAssignment = typeof usersAssignmentsTable.$inferSelect;

export type InsertNewAssignmentStatus =
  typeof newAssignmentStatusTable.$inferInsert;
export type SelectNewAssignmentStatus =
  typeof newAssignmentStatusTable.$inferSelect;

export type InsertNewAssignmentPublicRequest =
  typeof newAssignmentPublicRequestsTable.$inferInsert;
export type SelectNewAssignmentPublicRequest =
  typeof newAssignmentPublicRequestsTable.$inferSelect;
