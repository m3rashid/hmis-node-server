import { NotificationModel } from '../models/notification';

export interface CreateNotification {
  title: string;
  description: string;
  createdBy: string;
}
export const createNotification = async ({
  createdBy,
  description,
  title,
}: CreateNotification) => {
  const notification = new NotificationModel({ title, description, createdBy });
  const newNotification = await notification.save();
  return newNotification;
};
