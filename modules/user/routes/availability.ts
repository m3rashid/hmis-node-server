import {
  addAvailability,
  updateAvailability,
} from '../controllers/availability';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, availabilityValidator } from '@hmis/gatekeeper';

const availabilityRouter: Router = Router();
const useRoute = ERRORS.useRoute;

availabilityRouter.post(
  '/add',
  checkAuth,
  Validator.validate(availabilityValidator.createAvailabilitySchema),
  useRoute(addAvailability)
);
availabilityRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(availabilityValidator.updateAvailabilitySchema),
  useRoute(updateAvailability)
);

export default availabilityRouter;
