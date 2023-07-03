import {
  addPrescription,
  getAllPrescriptions,
  getPrescriptionDetails,
  updatePrescription,
} from '../controllers/prescription';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, prescriptionValidator } from '@hmis/gatekeeper';

const prescriptionRouter: Router = Router();
const useRoute = ERRORS.useRoute;

prescriptionRouter.post(
  '/add',
  checkAuth,
  Validator.validate(prescriptionValidator.createPrescriptionSchema),
  useRoute(addPrescription)
);
prescriptionRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(prescriptionValidator.updatePrescriptionSchema),
  useRoute(updatePrescription)
);
prescriptionRouter.get('/', checkAuth, useRoute(getAllPrescriptions));
prescriptionRouter.post(
  '/details',
  checkAuth,
  Validator.validate(prescriptionValidator.deletePrescriptionSchema),
  useRoute(getPrescriptionDetails)
);

export default prescriptionRouter;
