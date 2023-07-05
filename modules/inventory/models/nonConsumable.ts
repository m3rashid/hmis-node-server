import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const nonConsumableSchema = new mongoose.Schema<MODELS.INonConsumable>(
  {
    ...baseModelSchema,
    name: { type: String, unique: true, required: true },
    quantityLeft: { type: Number, required: true },
    manufacturer: { type: String },
    lastServicingDate: { type: Date },
    nextServicingDate: { type: Date },
  },
  { timestamps: true }
);

export const NonConsumableModel = paginatedCompiledModel<MODELS.INonConsumable>(
  modelNames.nonConsumable,
  nonConsumableSchema
);
