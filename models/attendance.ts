import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type {
  Document,
  PaginateModel,
  IAttendance,
} from '@hmis/gatekeeper/models';
import { modelNames } from '@hmis/gatekeeper/models';

const attendanceSchema = new mongoose.Schema<IAttendance>({
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
  Document<IAttendance>,
  PaginateModel<IAttendance>
>(modelNames.attendance, attendanceSchema);
