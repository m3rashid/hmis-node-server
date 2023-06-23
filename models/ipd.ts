import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { MODELS } from '@hmis/gatekeeper';
import { ENUMS, modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const ipdSchema = new mongoose.Schema<MODELS.IIpd>(
  {
    ...baseModelSchema,
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    status: {
      type: String,
      enum: ENUMS.IPD_STATUS,
      default: 'ADMITTED',
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelNames.payment,
      },
    ],
    history: [
      {
        prescriptions: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.prescription,
          required: true,
        },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.user,
          required: true,
        },
      },
    ],
    resources: [
      {
        nonConsumables: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.nonConsumable,
        },
        consumables: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.consumable,
        },
        time: { type: String },
        timeUnit: { type: String, enum: ENUMS.TIME_UNITS },
      },
    ],
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelNames.test,
        required: true,
      },
    ],
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
    },
    chats: [
      {
        time: { type: String, required: true },
        remarks: { type: String },
        from: { type: String, enum: MODELS.IUser },
      },
    ],
  },
  { timestamps: true }
);

ipdSchema.plugin(paginate);

export const IpdModel = mongoose.model<
  MODELS.Document<MODELS.IIpd>,
  MODELS.PaginateModel<MODELS.IIpd>
>(modelNames.ipd, ipdSchema);
