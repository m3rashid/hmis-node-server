import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import type { MODELS } from '@hmis/gatekeeper';
import { modelNames } from '@hmis/gatekeeper';

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

attendanceSchema.plugin(paginate);

export const AttendanceModel = mongoose.model<
  MODELS.Document<MODELS.IAttendance>,
  MODELS.PaginateModel<MODELS.IAttendance>
>(modelNames.attendance, attendanceSchema);
