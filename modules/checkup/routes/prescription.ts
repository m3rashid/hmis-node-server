import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { PrescriptionModel } from '../models/prescription';
import { getPrescriptionDetails } from '../controllers/prescription';
import { ERRORS, Validator, prescriptionValidator } from '@hmis/gatekeeper';

const prescriptionRouter: Router = Router();
const useRoute = ERRORS.useRoute;

prescriptionRouter.post(
  '/add',
  checkAuth,
  Validator.validate(prescriptionValidator.createPrescriptionSchema),
  useRoute(Create<MODELS.IPrescription>(PrescriptionModel, {}))
);

prescriptionRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(prescriptionValidator.updatePrescriptionSchema),
  useRoute(Edit<MODELS.IPrescription>(PrescriptionModel, {}))
);

prescriptionRouter.get(
  '/',
  checkAuth,
  useRoute(List<MODELS.IPrescription>(PrescriptionModel, {}))
);

prescriptionRouter.post(
  '/details',
  checkAuth,
  Validator.validate(prescriptionValidator.deletePrescriptionSchema),
  useRoute(getPrescriptionDetails)
);

export default prescriptionRouter;
