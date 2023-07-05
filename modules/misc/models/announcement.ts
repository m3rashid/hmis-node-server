import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const notificationSchema = new mongoose.Schema<MODELS.IAnnouncement>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const AnnouncementModel = paginatedCompiledModel<MODELS.IAnnouncement>(
  modelNames.announcement,
  notificationSchema
);
