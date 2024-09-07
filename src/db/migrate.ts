import config from 'drizzle.config';
import { db, pool } from './db';
import env from 'src/utils/env';
import { migrate } from 'drizzle-orm/node-postgres/migrator'

if (!env.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations',
  );
}

async function main() {
  await migrate(db, { migrationsFolder: config.out! });
  await pool.end();
}

main();
