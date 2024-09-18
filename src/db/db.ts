import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';
import { DrizzleDB } from './drizzle';
import { Pool } from 'pg';
import env from 'src/utils/env';

export const pool = new Pool({ connectionString: env.DB_URL });
export const db = drizzle(pool, { schema }) as DrizzleDB;
