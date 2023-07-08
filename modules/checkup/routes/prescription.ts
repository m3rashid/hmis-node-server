import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import type { Response} from 'express';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { PrescriptionModel } from '../models/prescription';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, Validator, prescriptionValidator } from '@hmis/gatekeeper';

const prescriptionRouter: Router = Router();
const useRoute = ERRORS.useRoute;

prescriptionRouter.post(
  '/add',
  checkAuth,
  Validator.validate(prescriptionValidator.createPrescriptionSchema),
  Create<MODELS.IPrescription>(PrescriptionModel, {})
);

prescriptionRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(prescriptionValidator.updatePrescriptionSchema),
  Edit<MODELS.IPrescription>(PrescriptionModel, {})
);

prescriptionRouter.get(
  '/',
  checkAuth,
  List<MODELS.IPrescription>(PrescriptionModel, {})
);

prescriptionRouter.post(
  '/details',
  checkAuth,
  Validator.validate(prescriptionValidator.deletePrescriptionSchema),
  useRoute(
    async (
      req: RequestWithBody<prescriptionValidator.DeletePrescriptionBody>,
      res: Response
    ) => {
      const prescriptionDetails = await PrescriptionModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(prescriptionDetails);
    }
  )
);

export default prescriptionRouter;
