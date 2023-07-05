import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const userSchema = new mongoose.Schema<MODELS.IUser>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    origin: { type: String, enum: ENUMS.USER_ORIGIN, default: 'EXTERNAL' },
    isDoctor: { type: Boolean, default: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.role },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.profile },
  },
  { timestamps: true }
);

userSchema.index({ name: 'text', email: 'text', role: 1 });

export const UserModel = paginatedCompiledModel<MODELS.IUser>(
  modelNames.user,
  userSchema
);
