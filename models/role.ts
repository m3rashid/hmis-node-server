import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { Document, IRole, PaginateModel } from '@hmis/gatekeeper/models';
import { modelNames } from '@hmis/gatekeeper/models';
import { baseModelSchema } from '.';

const roleSchema = new mongoose.Schema<IRole>(
  {
    ...baseModelSchema,
    displayName: { type: String, required: true },
    actualName: { type: String, unique: true, required: true },
    description: { type: String },
    permissions: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

roleSchema.plugin(paginate);

export const RoleModel = mongoose.model<Document<IRole>, PaginateModel<IRole>>(
  modelNames.role,
  roleSchema
);
