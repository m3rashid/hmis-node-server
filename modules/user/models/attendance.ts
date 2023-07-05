import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const attendanceSchema = new mongoose.Schema<MODELS.IAttendance>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: modelNames.user,
    required: true,
  },
  date: { type: Date, required: true },
  slots: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },
  ],
});

export const AttendanceModel = paginatedCompiledModel<MODELS.IAttendance>(
  modelNames.attendance,
  attendanceSchema
);
