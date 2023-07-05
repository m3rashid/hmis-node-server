import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const projectSchema = new mongoose.Schema<MODELS.IProject>(
  {
    ...baseModelSchema,
  },
  { timestamps: true }
);

export const SubTaskModel = paginatedCompiledModel<MODELS.IProject>(
  modelNames.project,
  projectSchema
);
