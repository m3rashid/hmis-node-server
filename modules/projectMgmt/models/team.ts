import {
  modelNames,
  type MODELS,
  paginatedCompiledModel,
} from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { baseModelSchema } from '../../../utils/models';

const teamSchema = new mongoose.Schema<MODELS.ITeam>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    description: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.user }],
  },
  { timestamps: true }
);

export const TeamModel = paginatedCompiledModel<MODELS.ITeam>(
  modelNames.team,
  teamSchema
);
