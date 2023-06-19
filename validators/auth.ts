import { z } from 'zod';

import { BLOOD_GROUPS, MARITAL_STATUS, SEX } from 'models/profile';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from 'validators/base';

export const loginSchema = z.object({
  email: z.string().email('Not a valid Email'),
  password: z.string(),
});
export type LoginBody = z.infer<typeof loginSchema>;

export const userSignupSchema = baseAuthnCreateSchema
  .merge(loginSchema)
  .extend({
    emailVerified: z.boolean(),
    name: z.string().min(3).max(30),
    roles: z.array(z.string()),
    profile: z.string().optional(),
  });
export type UserSignupBody = z.infer<typeof userSignupSchema>;

export const patientSignupInitSchema = z.object({});
export type PatientSignupInitBody = z.infer<typeof patientSignupInitSchema>;

export const patientSignupTwoSchema = z.object({});
export type PatientSignupTwoBody = z.infer<typeof patientSignupTwoSchema>;

export const patientSignupFinalSchema = z.object({});
export type PatientSignupFinalBody = z.infer<typeof patientSignupFinalSchema>;

export const createProfileSchema = baseAuthnCreateSchema.extend({
  bio: z.string().optional(),
  roomNumber: z.string().optional(),
  age: z.number().optional(),
  sex: z.enum(SEX),
  phone: z.string().optional(),
  phoneVerified: z.boolean(),
  maritalStatus: z.enum(MARITAL_STATUS).optional(),
  profilePicture: z.string().optional(),
  addresses: z.array(z.string()),
  bloodGroup: z.enum(BLOOD_GROUPS).optional(),
  origin: z.string().optional(),
  lastVisit: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  userHealthId: z.string().optional(),
  user: z.string(),
  leaves: z.array(z.string()).optional(),
  availabilities: z.array(z.string()).optional(),
  appointmentsAsDoctor: z.array(z.string()).optional(),
  appointmentsAsPatient: z.array(z.string()).optional(),
  appointmentsAsReferredBy: z.array(z.string()).optional(),
});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

export const updateProfileSchema = baseAuthnUpdateSchema
  .merge(createProfileSchema)
  .extend({
    profileId: z.string(),
  });
export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
