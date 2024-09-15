import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import * as z from 'zod';

import { activate_tokens } from './activate_tokens';
import { forget_password_tokens } from './forget_password_tokens';
import { user_addresses } from './user_addresses';

export const USER_ROLE = pgEnum('user_role', ['user', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  avatar_url: varchar('avatar_url', { length: 1025 }),
  cover_url: varchar('cover_url', { length: 1025 }),
  phone: varchar('phone', { length: 255 }),
  role: USER_ROLE('user_role').default('user'),

  is_active: boolean('is_active').default(false),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const users_rel = relations(users, ({ many }) => ({
  activate_tokens: many(activate_tokens),
  forget_password_tokens: many(forget_password_tokens),
  addresses: many(user_addresses),
}));

export type User = typeof users.$inferSelect;
export type UserRole = (typeof USER_ROLE.enumValues)[number];
