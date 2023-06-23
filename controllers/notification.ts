import type { Request, Response } from 'express';

import { NotificationModel } from '../models/notification';
import { createNotification } from '../services/notifications';

export const getNotifications = async (req: Request, res: Response) => {
  const notifications = await NotificationModel.find({ deleted: false });
  return res.status(200).json(notifications);
};

export const addNotification = async (req: Request, res: Response) => {
	const notification = await createNotification(
		// 
	)
	res.status(200).json(notification);
};