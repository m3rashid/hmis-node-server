import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { ENUMS, modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const opdSchema = new mongoose.Schema<MODELS.IOpd>(
  {
    ...baseModelSchema,
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.appointment,
      required: true,
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.prescription,
      required: true,
    },
    status: {
      type: String,
      enum: ENUMS.OPD_STATUS,
      default: 'PENDING',
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.payment,
    },
    date: { type: Date, required: true },
    nextDate: { type: String },
  },
  { timestamps: true }
);

opdSchema.plugin(paginate);

export const OpdModel = mongoose.model<
  MODELS.Document<MODELS.IOpd>,
  MODELS.PaginateModel<MODELS.IOpd>
>(modelNames.opd, opdSchema);
