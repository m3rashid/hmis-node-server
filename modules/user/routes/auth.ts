import {
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
} from '../controllers/auth';
import { Router } from 'express';
import Get from '../../default/get';
import { UserModel } from '../models/user';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import { issueJWT, revalidateJWT } from '../helpers/jwt';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

const authRouter: Router = Router();
const useRoute = ERRORS.useRoute;

authRouter.post(
  '/login',
  Validator.validate(authValidator.loginSchema),
  useRoute(login)
);

authRouter.post(
  '/logout',
  useRoute(async (req: Request, res: Response) => {
    return res.sendStatus(200);
  })
);

authRouter.post(
  '/revalidate',
  Get<MODELS.IUser>(UserModel, {
    requireAuth: false,
    populate: ['role', 'profile'],
    reqTransformer: async (req) => {
      const rfToken = req.headers.authorization;
      if (!rfToken) throw ERRORS.newError('No Token Provided');

      const { valid, expired, payload } = revalidateJWT(rfToken);
      if (!valid || expired) throw ERRORS.newError('Unauthorized');

      const userId = (payload?.sub as any)?._id;
      if (!userId) throw ERRORS.newError('No user found');
      req.user = { ...(req.user || {}), _id: userId };
      return req;
    },
    filterQueryTransformer: async ({ user }) => ({ _id: user._id }),
    serializer: async ({ data }) => {
      if (!data) throw ERRORS.newError('User not found');
      const { accessToken, refreshToken } = issueJWT(data);
      return { user: data, accessToken, refreshToken } as any;
    },
  })
);

authRouter.post(
  '/forgot-password',
  Validator.validate(authValidator.forgotPasswordSchema),
  useRoute(forgotPassword)
);

authRouter.post(
  '/update-password',
  // Validator.validate(authValidator.forgotPasswordSchema),
  useRoute(updatePassword)
);

authRouter.post(
  '/reset-password',
  Validator.validate(authValidator.resetPasswordSchema),
  useRoute(resetPassword)
);

export default authRouter;
