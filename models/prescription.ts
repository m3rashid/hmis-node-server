import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { ENUMS, modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

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

prescriptionSchema.plugin(paginate);

export const PrescriptionModel = mongoose.model<
  MODELS.Document<MODELS.IPrescription>,
  MODELS.PaginateModel<MODELS.IPrescription>
>(modelNames.prescription, prescriptionSchema);
