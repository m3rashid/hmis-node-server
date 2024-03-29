import type { MODELS } from '@hmis/gatekeeper';
import 'dotenv/config';
import { z } from 'zod';

const environmentVariables = z.object({
  ROLLUP_WATCH: z.enum(['true', 'false']),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  MAILER_USER: z.string(),
  MAILER_HOST: z.string(),
  MAILER_PASSWORD: z.string(),
  ACCESS_SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_REGION: z.string(),
  RAZORPAY_SECRET: z.string(),
  RAZORPAY_KEY_ID: z.string(),
});

environmentVariables.parse(process.env);

declare global {
  namespace Express {
    interface Request {
      user: MODELS.ILoginUser;
      isAuthenticated: boolean;
    }
  }
}
