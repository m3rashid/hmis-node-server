import 'dotenv/config'
import { z } from 'zod'

const environmentVariables = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z.string(),
	DATABASE_URL: z.string(),
	MAILER_USER: z.string(),
	MAILER_HOST: z.string(),
	MAILER_PASSWORD: z.string()
})

environmentVariables.parse(process.env)

declare global {
	namespace Express {
		interface Request {
			user: any
		}
	}

	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof environmentVariables> {}
	}
}
