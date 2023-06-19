import { z } from 'zod';

import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createRoleSchema = baseAuthnCreateSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});
export type CreateRoleBody = z.infer<typeof createRoleSchema>;

export const deleteRoleSchema = baseAuthnUpdateSchema.extend({
  roleId: z.string(),
});
export type DeleteRoleBody = z.infer<typeof deleteRoleSchema>;

export const editRoleSchema = baseAuthnUpdateSchema
  .merge(createRoleSchema)
  .merge(deleteRoleSchema)
  .extend({});
export type EditRoleBody = z.infer<typeof editRoleSchema>;
