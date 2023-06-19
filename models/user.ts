import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { modelNames } from '@hmis/gatekeeper/models';
import type { Document, IUser, PaginateModel } from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const userSchema = new mongoose.Schema<IUser>(
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

export const UserModel = mongoose.model<Document<IUser>, PaginateModel<IUser>>(
  modelNames.user,
  userSchema
);
