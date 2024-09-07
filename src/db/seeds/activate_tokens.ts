import moment from "moment";
import type { DrizzleDB } from "../drizzle.d.ts";
import { activate_tokens } from "../schema";
import env from "src/utils/env";

export default async function seed(db: DrizzleDB) {
  try {
    const userIds = await db.query.users.findMany({
      columns: {
        id: true
      }
    });

    const activateTokens = await Promise.all(
      userIds.map(userId => ({
        user_id: userId.id,
        expiration_date: moment().add(env.ACTIVATE_TOKENS_EXPIRATION, "milliseconds").toDate(),
        is_used: Math.random() > 0.5
      }))
    );

    await db.insert(activate_tokens).values(activateTokens);
  } catch (error) {
    throw new Error("Error happen durring seeding of activate tokens");
  }
} 
