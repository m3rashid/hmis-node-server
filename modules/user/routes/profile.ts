import { Router } from 'express';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { ProfileModel } from '../models/profile';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

const profileRouter: Router = Router();

profileRouter.post(
  '/create',
  checkAuth,
  Validator.validate(authValidator.createProfileSchema),
  Create<MODELS.IProfile>(ProfileModel, {})
);

profileRouter.post(
  '/update',
  checkAuth,
  Validator.validate(authValidator.updateProfileSchema),
  Edit<MODELS.IProfile>(ProfileModel, {})
);

export default profileRouter;
