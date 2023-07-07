import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const roleSchema = new mongoose.Schema<MODELS.IRole>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    permissions: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const RoleModel = paginatedCompiledModel<MODELS.IRole>(
  modelNames.role,
  roleSchema
);
