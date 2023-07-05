import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const subTaskSchema = new mongoose.Schema<MODELS.ISubTask>(
  {
    ...baseModelSchema,
  },
  { timestamps: true }
);

export const SubTaskModel = paginatedCompiledModel<MODELS.ISubTask>(
  modelNames.subTask,
  subTaskSchema
);
