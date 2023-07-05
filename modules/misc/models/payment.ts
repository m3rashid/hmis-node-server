import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const paymentSchema = new mongoose.Schema<MODELS.IPayment>(
  {
    ...baseModelSchema,
    type: {
      type: String,
      enum: ENUMS.PAYMENT_OPTIONS,
      default: 'CASH',
    },
    amountINR: { type: Number, required: true },
    status: { type: String, enum: ENUMS.PAYMENT_STATUS, required: true },
    reason: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = paginatedCompiledModel<MODELS.IPayment>(
  modelNames.payment,
  paymentSchema
);
