import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { ENUMS, modelNames } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const appointmentSchema = new mongoose.Schema<MODELS.IAppointment>(
  {
    ...baseModelSchema,
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    status: {
      type: String,
      enum: ENUMS.APPOINTMENT_STATUS,
      default: 'PENDING',
    },
    chats: [
      {
        time: { type: Date, required: true },
        remarks: { type: String },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelNames.user,
          required: true,
        },
      },
    ],
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.prescription,
    },
  },
  { timestamps: true }
);

appointmentSchema.plugin(paginate);

export const AppointmentModel = mongoose.model<
  MODELS.Document<MODELS.IAppointment>,
  MODELS.PaginateModel<MODELS.IAppointment>
>(modelNames.appointment, appointmentSchema);
