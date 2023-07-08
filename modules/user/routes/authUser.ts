import {
  ERRORS,
  Validator,
  authValidator,
  convertPermissionToReadable,
} from '@hmis/gatekeeper';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import Get from '../../default/get';
import List from '../../default/list';
import Create from '../../default/create';
import { UserModel } from '../models/user';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import { checkAuth } from '../../../middlewares/auth';

const userRouter: Router = Router();
const useRoute = ERRORS.useRoute;

userRouter.post('/all', checkAuth, List<MODELS.IUser>(UserModel, {}));

userRouter.get(
  '/me',
  checkAuth,
  Get<MODELS.IUser>(UserModel, {
    filterQueryTransformer: async ({ user }) => ({ _id: user._id }),
  })
);

userRouter.get(
  '/me-details',
  checkAuth,
  useRoute(async (req: Request, res: Response) => {
    if (!req.user) throw ERRORS.newError('User not found');
    const user = await UserModel.findById(req.user._id)
      .populate({ path: 'profile', populate: ['addresses', 'availabilities'] })
      .populate('role')
      .lean();

    const transformedUser = {
      ...user,
      role: {
        ...user?.role,
        permissions: convertPermissionToReadable(
          JSON.parse(JSON.stringify(user?.role?.permissions))
        ),
      },
    };

    return res.status(200).json(transformedUser);
  })
);

userRouter.post(
  '/signup',
  Validator.validate(authValidator.userSignupSchema),
  Create<MODELS.IUser>(UserModel, {
    requireAuth: false,
    payloadTransformer: async ({ payload }) => {
      payload.password = await bcrypt.hash(payload.password, 12);
      return payload;
    },
  })
);

export default userRouter;
