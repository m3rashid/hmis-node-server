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
    title: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    assignedTo: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user },
    ],
    subTasks: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.subTask },
    ],
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.taskStatus,
    },
    expectedCompletionTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TaskModel = paginatedCompiledModel<MODELS.ITask>(
  modelNames.task,
  taskSchema
);
