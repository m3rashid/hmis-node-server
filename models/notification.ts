import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const notificationSchema = new mongoose.Schema<MODELS.INotification>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

notificationSchema.plugin(paginate);

export const NotificationModel = mongoose.model<
  MODELS.Document<MODELS.INotification>,
  MODELS.PaginateModel<MODELS.INotification>
>(modelNames.notification, notificationSchema);
