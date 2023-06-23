import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const testSchema = new mongoose.Schema<MODELS.ITest>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    description: { type: String },
    costINR: { type: Number, required: true },
    suggestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
    },
    testReports: [{ type: String, required: true }],
    payment: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.payment },
  },
  { timestamps: true }
);

testSchema.plugin(paginate);

export const TestModel = mongoose.model<
  MODELS.Document<MODELS.ITest>,
  MODELS.PaginateModel<MODELS.ITest>
>(modelNames.test, testSchema);