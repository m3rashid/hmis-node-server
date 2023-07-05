import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const consumableSchema = new mongoose.Schema<MODELS.IConsumable>(
  {
    ...baseModelSchema,
    name: { type: String, unique: true, required: true },
    quantityLeft: { type: Number, required: true },
    quantityPerUnit: { type: Number, required: true },
    batchNumber: { type: String },
    expiryDate: { type: Date },
    manufacturer: { type: String },
    lastOrderDate: { type: Date },
    nextOrderDate: { type: Date },
  },
  { timestamps: true }
);

export const ConsumableModel = paginatedCompiledModel<MODELS.IConsumable>(
  modelNames.consumable,
  consumableSchema
);
