import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const taskSchema = new mongoose.Schema<MODELS.ITask>(
  {
    ...baseModelSchema,
  },
  { timestamps: true }
);

export const TaskModel = paginatedCompiledModel<MODELS.ITask>(
  modelNames.task,
  taskSchema
);
