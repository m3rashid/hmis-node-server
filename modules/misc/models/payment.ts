import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import type { MODELS } from '@hmis/gatekeeper';
import { ENUMS, modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';

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

paymentSchema.plugin(paginate);

export const PaymentModel = mongoose.model<
  MODELS.Document<MODELS.IPayment>,
  MODELS.PaginateModel<MODELS.IPayment>
>(modelNames.payment, paymentSchema);
