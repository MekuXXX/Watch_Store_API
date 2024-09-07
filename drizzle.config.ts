import { defineConfig } from 'drizzle-kit';
import env from "./src/utils/env";

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './src/db/migrations',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DB_URL,
  },
});
