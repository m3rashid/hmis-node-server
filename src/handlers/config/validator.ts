import { z } from 'zod'

export const addConfigSchema = z.object({
	containerName: z.string(),
	name: z.string(),
	value: z.string()
})
export type AddConfigBody = z.infer<typeof addConfigSchema>

export const editConfigSchema = z.object({
	...addConfigSchema.shape,
	configId: z.string()
})
export type EditConfigBody = z.infer<typeof editConfigSchema>
