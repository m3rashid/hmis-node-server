import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, ENUMS, paginatedCompiledModel } from '@hmis/gatekeeper';

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

export const LeaveModel = paginatedCompiledModel<MODELS.ILeave>(
  modelNames.leave,
  leaveSchema
);
