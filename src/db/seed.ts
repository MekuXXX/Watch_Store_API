import { Table, getTableName, sql } from 'drizzle-orm';
import { DrizzleDB } from './drizzle';
import { db, pool } from './db';
import * as schema from './schema';
import * as seed from './seeds';
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
  const schemaKeys = Object.keys(schema);
  for (const key of schemaKeys) {
    if (schema[key] instanceof Table) {
      // await db.delete(schema[key]); // clear tables without truncating / resetting ids
      await resetTable(db, schema[key]);
    }
  }

  const seedKeys = Object.keys(seed);
  for (const key of seedKeys) {
    await seed[key](db);
  }

  await pool.end();
}

main();
