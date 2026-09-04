import { pgTable, pgEnum, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum("task_status", ["pending", "completed"]);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(), // Just to make it VERY MUCH certain to never store in plaintext
    createdAt: timestamp("created_at").defaultNow(),
})

export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    status: statusEnum("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
})

// export type Task = {
//   user_id: string;
//   title: string;
//   status: "pending" | "completed";
//   date: string;
// }