import bcrypt from 'bcrypt';
import { Router } from 'express';
import Get from '../../default/get';
import List from '../../default/list';
import Create from '../../default/create';
import { UserModel } from '../models/user';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { currentUserAllDetails } from '../controllers/authUser';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

const userRouter: Router = Router();
const useRoute = ERRORS.useRoute;

userRouter.post('/all', useRoute(List<MODELS.IUser>(UserModel, {})));

userRouter.get(
  '/me',
  checkAuth,
  useRoute(
    Get<MODELS.IUser>(UserModel, {
      filterQueryTransformer: async ({ user }) => ({ _id: user._id }),
    })
  )
);

userRouter.get('/me-details', checkAuth, useRoute(currentUserAllDetails));

userRouter.post(
  '/signup',
  Validator.validate(authValidator.userSignupSchema),
  useRoute(
    Create<MODELS.IUser>(UserModel, {
      requireAuth: false,
      payloadTransformer: async ({ payload }) => {
        payload.password = await bcrypt.hash(payload.password, 12);
        return payload;
      },
    })
  )
);

export default userRouter;
