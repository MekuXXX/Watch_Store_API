import { Table, getTableName, sql } from 'drizzle-orm';
import { DrizzleDB } from './drizzle';
import { db, pool } from './db';
import * as schema from './schema';
import * as seeds from './seeds';
import env from 'src/utils/env';

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DrizzleDB, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function main() {
  for (const table of [
    schema.users,
    schema.activate_tokens,
    schema.forget_password_tokens,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.users(db);
  await seeds.activateTokens(db);

  await pool.end();
}

main();
