import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const testSchema = new mongoose.Schema<MODELS.ITest>(
  {
    ...baseModelSchema,
    name: { type: String, required: true },
    description: { type: String },
    costINR: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TestModel = paginatedCompiledModel<MODELS.ITest>(
  modelNames.test,
  testSchema
);
