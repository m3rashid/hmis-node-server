import type { Request, Response } from 'express';

import { NotificationModel } from '../models/notification';
import { createNotification } from '../services/notifications';
import type { notificationValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from './base';

export const getNotifications = async (req: Request, res: Response) => {
  const notifications = await NotificationModel.paginate({ deleted: false });
  return res.status(200).json(notifications);
};

export const addNotification = async (
  req: RequestWithBody<notificationValidator.CreateNotificationBody>,
  res: Response
) => {
  const notification = await createNotification({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });
  res.status(200).json(notification);
};
