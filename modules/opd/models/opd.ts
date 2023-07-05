import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

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

export const OpdModel = paginatedCompiledModel<MODELS.IOpd>(
  modelNames.opd,
  opdSchema
);
