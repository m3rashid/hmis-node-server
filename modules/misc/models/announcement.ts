import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';

const notificationSchema = new mongoose.Schema<MODELS.IAnnouncement>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

notificationSchema.plugin(paginate);

export const AnnouncementModel = mongoose.model<
  MODELS.Document<MODELS.IAnnouncement>,
  MODELS.PaginateModel<MODELS.IAnnouncement>
>(modelNames.announcement, notificationSchema);
