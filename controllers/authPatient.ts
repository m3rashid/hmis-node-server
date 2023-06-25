import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';
import { Router, type Request, type Response } from 'express';
import { UserModel } from '../models/user';
import type { PaginatedRequestQueryParams } from './base';

const signupPatientInit = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

const signupPatientStepTwo = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

const signupPatientFinalize = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

const getAllExternalUsersWithDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const users = await UserModel.paginate(
    { origin: 'EXTERNAL' },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};

const getAllExternalUsers = async (req: PaginatedRequestQueryParams, res: Response) => {
  const users = await UserModel.paginate(
    {
      deleted: false,
      origin: 'EXTERNAL',
    },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};

const patientRouter: Router = Router();
const useRoute = ERRORS.useRoute;

patientRouter.post(
  '/signup-init',
  Validator.validate(authValidator.patientSignupInitSchema),
  useRoute(signupPatientInit)
);
patientRouter.post(
  '/signup-two',
  Validator.validate(authValidator.patientSignupTwoSchema),
  useRoute(signupPatientStepTwo)
);
patientRouter.post(
  '/signup-final',
  Validator.validate(authValidator.patientSignupFinalSchema),
  useRoute(signupPatientFinalize)
);
patientRouter.get(
  '/all-with-deleted',
  useRoute(getAllExternalUsersWithDeleted)
);
patientRouter.get('/all', useRoute(getAllExternalUsers));

export default patientRouter;
