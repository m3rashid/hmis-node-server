import {
  addOpd,
  getAllOpd,
  getOpdDetails,
  updateOpd,
} from '../controllers/opd';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, opdValidator } from '@hmis/gatekeeper';

const opdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

opdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(opdValidator.addOpdSchema),
  useRoute(addOpd)
);
opdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(opdValidator.updateOpdSchema),
  useRoute(updateOpd)
);
opdRouter.get('/', checkAuth, useRoute(getAllOpd));
opdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(opdValidator.deleteOpdSchema),
  useRoute(getOpdDetails)
);

export default opdRouter;
