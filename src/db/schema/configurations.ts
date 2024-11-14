import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const configurations = pgTable('configurations', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key').notNull().unique(),
  value: varchar('value').notNull(),
  description: varchar('type'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
