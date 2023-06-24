import { Router, type Request, type Response } from 'express';

import { AnnouncementModel } from '../models/announcement';
import { createAnnouncement } from '../services/notifications';
import { ERRORS, Validator, announcementValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from './base';
import { checkAuth } from '../middlewares/auth';

const getAnnouncements = async (req: Request, res: Response) => {
  const announcements = await AnnouncementModel.paginate({ deleted: false });
  return res.status(200).json(announcements);
};

const addAnnouncement = async (
  req: RequestWithBody<announcementValidator.CreateAnnouncementBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const announcement = await createAnnouncement({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });
  res.status(200).json(announcement);
};

const notificationRouter: Router = Router();
const useRoute = ERRORS.useRoute;

notificationRouter.get(
  '/all',
  checkAuth,
  useRoute(getAnnouncements)
);
notificationRouter.post(
  '/add',
  checkAuth,
  Validator.validate(announcementValidator.createAnnouncementSchema),
  useRoute(addAnnouncement)
);

export default notificationRouter;
