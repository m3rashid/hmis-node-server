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
  },
  { timestamps: true }
);

export const SubTaskModel = paginatedCompiledModel<MODELS.ITeam>(
  modelNames.team,
  teamSchema
);
