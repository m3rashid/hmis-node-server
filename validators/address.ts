import { z } from 'zod';

import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from 'validators/base';

export const createAddressSchema = baseAuthnCreateSchema.extend({
  city: z.string(),
  state: z.string(),
  pinCode: z.string(),
  roomNumber: z.string().optional(),
  buildingNumber: z.string().optional(),
  user: z.string(),
});
export type CreateAddressBody = z.infer<typeof createAddressSchema>;

export const deleteAddressSchema = baseAuthnUpdateSchema.extend({
  addressId: z.string(),
});
export type DeleteAddressBody = z.infer<typeof deleteAddressSchema>;

export const updateAddressSchema = baseAuthnUpdateSchema
  .merge(createAddressSchema)
  .merge(deleteAddressSchema);
export type UpdateAddressBody = z.infer<typeof updateAddressSchema>;
