import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { ENUMS, modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

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
    timeMinutes: { type: Number, required: true }, // expected time in minutes
    status: {
      type: String,
      enum: ENUMS.APPOINTMENT_STATUS,
      default: 'PENDING',
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.payment },
    type: { type: String, enum: ENUMS.APPOINTMENT_TYPE },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const AppointmentModel = paginatedCompiledModel<MODELS.IAppointment>(
  modelNames.appointment,
  appointmentSchema
);
