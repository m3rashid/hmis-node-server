import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const ipdSchema = new mongoose.Schema<MODELS.IIpd>(
  {
    ...baseModelSchema,
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    status: { type: String, enum: ENUMS.IPD_STATUS, default: 'ADMITTED' },
    payments: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.payment },
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
        test: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.test,
          required: true,
        },
        remarks: { type: String },
        suggestedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.user,
        },
        payment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.payment,
        },
      },
    ],
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user },
    chats: [
      {
        time: { type: String, required: true },
        remarks: { type: String },
        from: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user },
      },
    ],
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const IpdModel = paginatedCompiledModel<MODELS.IIpd>(
  modelNames.ipd,
  ipdSchema
);
