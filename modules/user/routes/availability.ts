import { Router } from 'express';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { AvailabilityModel } from '../models/availability';
import { ERRORS, Validator, availabilityValidator } from '@hmis/gatekeeper';

const availabilityRouter: Router = Router();

availabilityRouter.post(
  '/add',
  checkAuth,
  Validator.validate(availabilityValidator.createAvailabilitySchema),
  Create<MODELS.IAvailability>(AvailabilityModel, {})
);

availabilityRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(availabilityValidator.updateAvailabilitySchema),
  Edit<MODELS.IAvailability>(AvailabilityModel, {})
);

export default availabilityRouter;
