import { ERRORS, Validator, authValidator } from "@hmis/gatekeeper";
import { Router, type Request, type Response } from "express";

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

export default patientRouter
