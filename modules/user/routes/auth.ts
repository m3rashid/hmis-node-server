import {
	login,
  resetPassword,
	forgotPassword,
  updatePassword,
  revalidateToken,
} from '../controllers/auth';
import { Router } from 'express';
import type { Request, Response} from 'express';
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

authRouter.post('/revalidate', useRoute(revalidateToken));

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
