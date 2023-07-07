import {
	getAllExternalUsers,
  signupPatientFinalize,
  signupPatientInit,
  signupPatientStepTwo,
} from '../controllers/authPatient';
import { Router } from 'express';
import { ERRORS, Validator, authValidator } from '@hmis/gatekeeper';

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
patientRouter.post('/all', useRoute(getAllExternalUsers));

export default patientRouter;
