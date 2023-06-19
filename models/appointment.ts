import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type {
  Document,
  PaginateModel,
  IAppointment,
} from '@hmis/gatekeeper/models';
import { modelNames, APPOINTMENT_STATUS } from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const appointmentSchema = new mongoose.Schema<IAppointment>(
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
    status: { type: String, enum: APPOINTMENT_STATUS, default: 'PENDING' },
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
  Document<IAppointment>,
  PaginateModel<IAppointment>
>(modelNames.appointment, appointmentSchema);
