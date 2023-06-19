import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { Document, ILeave, PaginateModel } from '@hmis/gatekeeper/models';
import { modelNames, LEAVE_STATUS } from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const leaveSchema = new mongoose.Schema<ILeave>(
  {
    ...baseModelSchema,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    status: { type: String, enum: LEAVE_STATUS, default: 'PENDING' },
  },
  { timestamps: true }
);

leaveSchema.plugin(paginate);

export const LeaveModel = mongoose.model<
  Document<ILeave>,
  PaginateModel<ILeave>
>(modelNames.leave, leaveSchema);
