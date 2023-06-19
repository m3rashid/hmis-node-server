import { z } from 'zod';

import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createConsumableSchema = baseAuthnCreateSchema.extend({
  name: z.string(),
  quantityLeft: z.number(),
  quantityPerUnit: z.number(),
  batchNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  manufacturer: z.string().optional(),
  lastOrderDate: z.string().optional(),
  nextOrderDate: z.string().optional(),
});
export type CreateConsumableBody = z.infer<typeof createConsumableSchema>;

export const deleteConsumableSchema = baseAuthnUpdateSchema.extend({
  consumableId: z.string(),
});
export type DeleteConsumableBody = z.infer<typeof deleteConsumableSchema>;

export const updateConsumableSchema = baseAuthnUpdateSchema
  .merge(deleteConsumableSchema)
  .extend({});
export type UpdateConsumableBody = z.infer<typeof updateConsumableSchema>;

export const createNonConsumableSchema = baseAuthnCreateSchema.extend({
  name: z.string(),
  quantityLeft: z.number(),
  manufacturer: z.string().optional(),
  lastServicingDate: z.string().optional(),
  nextServicingDate: z.string().optional(),
});
export type CreateNonConsumableBody = z.infer<typeof createNonConsumableSchema>;

export const deleteNonConsumableSchema = baseAuthnUpdateSchema.extend({
  nonConsumableId: z.string(),
});
export type DeleteNonConsumableBody = z.infer<typeof deleteNonConsumableSchema>;

export const updateNonConsumableSchema = baseAuthnUpdateSchema
  .merge(deleteNonConsumableSchema)
  .extend({});
export type UpdateNonConsumableBody = z.infer<typeof updateNonConsumableSchema>;
