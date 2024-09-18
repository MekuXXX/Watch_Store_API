import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Function to load the appropriate .env file based on NODE_ENV
function loadEnv() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envFile = `.env.${nodeEnv}`;
  const envPath = path.resolve(__dirname, '../..', envFile);
  console.log(envPath);

  if (fs.existsSync(envPath)) {
    return config({ path: envPath });
  } else {
    throw new Error(`Environment file ${envFile} not found.`);
  }
}

expand(loadEnv());

const stringBoolean = z.coerce
  .string()
  .default('false')
  .transform((val) => val.toLowerCase() === 'true');

const stringNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)))
  .transform((val) => Number(val));

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  SERVER_URL: z.string(),

  // Swagger
  SWAGGER_ROUTE: z.string(),

  // App
  APP_NAME: z.string(),
  APP_MAIL: z.string(),
  APP_CLIENT_URL: z.string(),

  // Database
  DB_HOST: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_PORT: z.coerce.number().optional(),
  DB_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.string(),

  // Cache & Throttling
  MAX_CACHE_TIME: stringNumber,
  MAX_THROTTLER_TIME: stringNumber,
  MAX_THROTTLER_LIMIT: stringNumber,

  // Redis
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: stringNumber.optional(),
  REDIS_URL: z.string(),

  // Mail service
  MAIL_HOST: z.string(),
  MAIL_PORT: stringNumber,
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),

  // Others
  FORGET_PASSWORD_TOKENS_EXPIRATION: stringNumber,
  ACTIVATE_TOKENS_EXPIRATION: stringNumber,
  PAGINATION_LIMIT: stringNumber,
  PAGINATION_PAGE: stringNumber,
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error);
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
