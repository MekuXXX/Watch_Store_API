// import { Table, getTableName, sql } from 'drizzle-orm';
// import { DrizzleDB } from './drizzle';
// import { createDB } from './db';
// import * as schema from './schema';
// import * as seeds from './seeds';

// config();

// async function resetTable(db: DrizzleDB, table: Table) {
//   return db.execute(
//     sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
//   );
// }

// async function main() {
//   const isSeed = process.env.DATABASE_SEED.toLowerCase();

//   if (isSeed !== 'true') {
//     throw new Error('Seeding is not accepted in this database');
//   }

//   const db = createDB();
//   console.log('Hitted');
//   const user = await db.query.users.findFirst({
//     with: { activate_tokens: true },
//   });
//   console.log(user);

//   // for (const table of [
//   //   schema.users,
//   //   schema.activate_tokens,
//   //   schema.forget_password_tokens,
//   // ]) {
//   //   // await db.delete(table); // clear tables without truncating / resetting ids
//   //   await resetTable(db, table);
//   // }

//   // seeds.users(db);
// }

// main();
