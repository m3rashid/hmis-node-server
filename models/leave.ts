import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { modelNames, ENUMS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const leaveSchema = new mongoose.Schema<MODELS.ILeave>(
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
    status: { type: String, enum: ENUMS.LEAVE_STATUS, default: 'PENDING' },
  },
  { timestamps: true }
);

leaveSchema.plugin(paginate);

export const LeaveModel = mongoose.model<
  MODELS.Document<MODELS.ILeave>,
  MODELS.PaginateModel<MODELS.ILeave>
>(modelNames.leave, leaveSchema);
