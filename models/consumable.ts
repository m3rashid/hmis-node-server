import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { modelNames } from '@hmis/gatekeeper';

import { baseModelSchema } from './index';

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

consumableSchema.plugin(paginate);

export const ConsumableModel = mongoose.model<
  MODELS.Document<MODELS.IConsumable>,
  MODELS.PaginateModel<MODELS.IConsumable>
>(modelNames.consumable, consumableSchema);
