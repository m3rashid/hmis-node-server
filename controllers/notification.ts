import { Router, type Request, type Response } from 'express';

import { NotificationModel } from '../models/notification';
import { createNotification } from '../services/notifications';
import { ERRORS, Validator, notificationValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from './base';
import { checkAuth } from '../middlewares/auth';

const getNotifications = async (req: Request, res: Response) => {
  const notifications = await NotificationModel.paginate({ deleted: false });
  return res.status(200).json(notifications);
};

const addNotification = async (
  req: RequestWithBody<notificationValidator.CreateNotificationBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const notification = await createNotification({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });
  res.status(200).json(notification);
};

const notificationRouter: Router = Router();
const useRoute = ERRORS.useRoute;

notificationRouter.get(
  '/all',
  checkAuth,
  useRoute(getNotifications)
);
notificationRouter.post(
  '/add',
  checkAuth,
  Validator.validate(notificationValidator.createNotificationSchema),
  useRoute(addNotification)
);

export default notificationRouter;
