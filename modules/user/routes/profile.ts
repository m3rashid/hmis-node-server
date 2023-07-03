import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';
import { createProfile, updateProfile } from '../controllers/profile';

const profileRouter: Router = Router();
const useRoute = ERRORS.useRoute;

profileRouter.post(
  '/create',
  checkAuth,
  Validator.validate(authValidator.createProfileSchema),
  useRoute(createProfile)
);
profileRouter.post(
  '/update',
  checkAuth,
  Validator.validate(authValidator.updateProfileSchema),
  useRoute(updateProfile)
);

export default profileRouter;
