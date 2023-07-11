import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
	ENUMS,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const subTaskSchema = new mongoose.Schema<MODELS.ISubTask>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    status: {
      type: String,
      required: true,
      enum: ENUMS.TASK_STATUS,
    },
    expectedCompletionTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export const SubTaskModel = paginatedCompiledModel<MODELS.ISubTask>(
  modelNames.subTask,
  subTaskSchema
);
