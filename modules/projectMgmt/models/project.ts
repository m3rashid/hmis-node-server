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
    title: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.task }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.goal }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.team }],
  },
  { timestamps: true }
);

export const ProjectModel = paginatedCompiledModel<MODELS.IProject>(
  modelNames.project,
  projectSchema
);
