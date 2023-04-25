import { z } from 'zod'

export const addResourceSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	type: z.string().optional()
})
export type AddResourceBody = z.infer<typeof addResourceSchema>

export const editResourceSchema = z.object({
	...addResourceSchema.shape,
	resourceId: z.string()
})
export type EditResourceBody = z.infer<typeof editResourceSchema>
