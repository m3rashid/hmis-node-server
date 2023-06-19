import { z } from 'zod';

export const baseAuthnCreateSchema = z.object({
  deleted: z.boolean(),
  createdBy: z.string(),
});
export type BaseAuthnCreateBody = z.infer<typeof baseAuthnCreateSchema>;

export const baseAuthnUpdateSchema = z.object({});
export type BaseAuthnUpdateBody = z.infer<typeof baseAuthnUpdateSchema>;
