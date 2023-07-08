import { Router } from 'express';
import List from '../../default/list';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { AnnouncementModel } from '../models/announcement';
import { ERRORS, Validator, announcementValidator } from '@hmis/gatekeeper';

const announcementRouter: Router = Router();
const useRoute = ERRORS.useRoute;

announcementRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.IAnnouncement>(AnnouncementModel, {}))
);

announcementRouter.post(
  '/add',
  checkAuth,
  Validator.validate(announcementValidator.createAnnouncementSchema),
  useRoute(Create<MODELS.IAnnouncement>(AnnouncementModel, {}))
);

export default announcementRouter;
