import {
  signupUser,
  currentUser,
  getAllInternalUsers,
  currentUserAllDetails,
} from '../controllers/authUser';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

const userRouter: Router = Router();
const useRoute = ERRORS.useRoute;

userRouter.post('/all', useRoute(getAllInternalUsers));
userRouter.get('/me', checkAuth, useRoute(currentUser));
userRouter.get('/me-details', checkAuth, useRoute(currentUserAllDetails));
userRouter.post(
  '/signup',
  Validator.validate(authValidator.userSignupSchema),
  useRoute(signupUser)
);

export default userRouter;
