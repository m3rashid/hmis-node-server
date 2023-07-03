import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';

const testSchema = new mongoose.Schema<MODELS.ITest>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    description: { type: String },
    costINR: { type: Number, required: true },
  },
  { timestamps: true }
);

testSchema.plugin(paginate);

export const TestModel = mongoose.model<
  MODELS.Document<MODELS.ITest>,
  MODELS.PaginateModel<MODELS.ITest>
>(modelNames.test, testSchema);
