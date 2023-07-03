import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, announcementValidator } from '@hmis/gatekeeper';
import { addAnnouncement, getAnnouncements } from '../controllers/announcement';

const announcementRouter: Router = Router();
const useRoute = ERRORS.useRoute;

announcementRouter.get('/all', checkAuth, useRoute(getAnnouncements));
announcementRouter.post(
  '/add',
  checkAuth,
  Validator.validate(announcementValidator.createAnnouncementSchema),
  useRoute(addAnnouncement)
);

export default announcementRouter;
