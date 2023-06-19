import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const userSchema = new mongoose.Schema<MODELS.IUser>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelNames.role,
        required: true,
      },
    ],
    profile: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.profile },
  },
  { timestamps: true }
);

userSchema.plugin(paginate);

export const UserModel = mongoose.model<
  MODELS.Document<MODELS.IUser>,
  MODELS.PaginateModel<MODELS.IUser>
>(modelNames.user, userSchema);
