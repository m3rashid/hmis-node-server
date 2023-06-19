import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { modelNames } from '@hmis/gatekeeper/models';
import type {
  Document,
  INonConsumable,
  PaginateModel,
} from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const nonConsumableSchema = new mongoose.Schema<INonConsumable>(
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
  Document<INonConsumable>,
  PaginateModel<INonConsumable>
>(modelNames.nonConsumable, nonConsumableSchema);
