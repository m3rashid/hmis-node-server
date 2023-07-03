import type { NextFunction, Request, Response } from 'express';

import { ERRORS } from '@hmis/gatekeeper';
import { verifyJWT } from '../modules/user/helpers/jwt';
import type { ILoginUser } from '@hmis/gatekeeper/models';

export const actualAuthCheck = (req: Request): Request => {
  const token = req.headers.authorization;
  if (!token) throw ERRORS.newError('Token not provided');
  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) throw ERRORS.newError('Token invalid or expired');
  const tokenUser: ILoginUser = payload?.sub as any;
  req.user = tokenUser;
  req.isAuthenticated = true;
  return req;
};

export const checkAuth: ReturnType<typeof ERRORS.useRoute> = ERRORS.useRoute(
  (req: Request, res: Response, next: NextFunction) => {
    actualAuthCheck(req);
    next();
  }
);
