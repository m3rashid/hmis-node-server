import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Not a valid Email'),
	password: z.string()
})
export type LoginBody = z.infer<typeof loginSchema>
