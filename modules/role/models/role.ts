import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';

const roleSchema = new mongoose.Schema<MODELS.IRole>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    description: { type: String },
    permissions: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

roleSchema.plugin(paginate);

export const RoleModel = mongoose.model<
  MODELS.Document<MODELS.IRole>,
  MODELS.PaginateModel<MODELS.IRole>
>(modelNames.role, roleSchema);
