import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { modelNames as models } from '@hmis/gatekeeper/models';
import type {
  Document,
  INotification,
  PaginateModel,
} from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const notificationSchema = new mongoose.Schema<INotification>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

notificationSchema.plugin(paginate);

export const NotificationModel = mongoose.model<
  Document<INotification>,
  PaginateModel<INotification>
>(models.notification, notificationSchema);
