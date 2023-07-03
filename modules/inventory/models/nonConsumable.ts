import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';

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

nonConsumableSchema.plugin(paginate);

export const NonConsumableModel = mongoose.model<
  MODELS.Document<MODELS.INonConsumable>,
  MODELS.PaginateModel<MODELS.INonConsumable>
>(modelNames.nonConsumable, nonConsumableSchema);
