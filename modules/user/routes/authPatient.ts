import { Router } from 'express';
import List from '../../default/list';
import { UserModel } from '../models/user';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

const patientRouter: Router = Router();
const useRoute = ERRORS.useRoute;

patientRouter.post(
  '/signup-init',
  Validator.validate(authValidator.patientSignupInitSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Init');
  })
);

patientRouter.post(
  '/signup-two',
  Validator.validate(authValidator.patientSignupTwoSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Two');
  })
);

patientRouter.post(
  '/signup-final',
  Validator.validate(authValidator.patientSignupFinalSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Final');
  })
);

patientRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.IUser>(UserModel, {}))
);

export default patientRouter;
