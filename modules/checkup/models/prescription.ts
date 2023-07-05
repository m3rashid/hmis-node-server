import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const prescriptionSchema = new mongoose.Schema<MODELS.IPrescription>(
  {
    ...baseModelSchema,
    remarks: { type: String },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.appointment,
      required: true,
    },
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.consumable,
          required: true,
        },
        dosage: {
          perDay: { type: Number, required: true },
          timeOfDay: { type: String, enum: ENUMS.TIME_OF_DAY },
          durationInDays: { type: Number },
          perWeek: { type: Number, default: 7 },
        },
      },
    ],
  },
  { timestamps: true }
);

export const PrescriptionModel = paginatedCompiledModel<MODELS.IPrescription>(
  modelNames.prescription,
  prescriptionSchema
);
