import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { TIME_OF_DAY, modelNames } from '@hmis/gatekeeper/models';
import type {
  Document,
  IPrescription,
  PaginateModel,
} from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const prescriptionSchema = new mongoose.Schema<IPrescription>(
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
          timeOfDay: { type: String, enum: TIME_OF_DAY },
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
  Document<IPrescription>,
  PaginateModel<IPrescription>
>(modelNames.prescription, prescriptionSchema);
