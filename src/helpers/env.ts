import 'dotenv/config'
import { z } from 'zod'
import type { ILoginUser } from 'helpers/jwt'

const environmentVariables = z.object({
	ROLLUP_WATCH: z.enum(['true', 'false']),
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z.string(),
	DATABASE_URL: z.string(),
	MAILER_USER: z.string(),
	MAILER_HOST: z.string(),
	MAILER_PASSWORD: z.string(),
	DEV_PASSWORD: z.string(),
	ADMIN_PASSWORD: z.string(),
	ACCESS_SECRET: z.string(),
	REFRESH_SECRET: z.string()
})

environmentVariables.parse(process.env)

declare global {
	namespace Express {
		interface Request {
			user: ILoginUser
			isAuthenticated: boolean
		}
	}

	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof environmentVariables> {}
	}
}
