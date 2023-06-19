import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type {
  Document,
  PaginateModel,
  IConsumable,
} from '@hmis/gatekeeper/models';
import { modelNames } from '@hmis/gatekeeper/models';

import { baseModelSchema } from './index';

const consumableSchema = new mongoose.Schema<IConsumable>(
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
  Document<IConsumable>,
  PaginateModel<IConsumable>
>(modelNames.consumable, consumableSchema);
