import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';
import { DrizzleDB } from './drizzle';
import { Pool } from 'pg';

export function createDB() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return drizzle(pool, { schema, logger: true }) as DrizzleDB;
}
