import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const goalSchema = new mongoose.Schema<MODELS.IGoal>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String },
    achieved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GoalModel = paginatedCompiledModel<MODELS.IGoal>(
  modelNames.goal,
  goalSchema
);
