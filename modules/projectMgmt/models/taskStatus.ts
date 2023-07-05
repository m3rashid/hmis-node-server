import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const taskStatusSchema = new mongoose.Schema<MODELS.ITaskStatus>(
  {
    ...baseModelSchema,
    name: { type: String },
  },
  { timestamps: true }
);

export const TaskStatusModel = paginatedCompiledModel<MODELS.ITaskStatus>(
  modelNames.taskStatus,
  taskStatusSchema
);
