import { z } from 'zod'

export const createRoleSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	permissions: z.array(z.string()).optional()
})
export type CreateRoleBody = z.infer<typeof createRoleSchema>

export const deleteRoleSchema = z.object({
	roleId: z.string()
})
export type DeleteRoleBody = z.infer<typeof deleteRoleSchema>

export const editRoleSchema = z.object({
	...createRoleSchema.shape,
	...deleteRoleSchema.shape
})
export type EditRoleBody = z.infer<typeof editRoleSchema>
