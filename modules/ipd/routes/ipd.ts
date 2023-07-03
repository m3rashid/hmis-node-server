import {
  addIpd,
  getAllIpd,
  getIpdDetails,
  updateIpd,
} from '../controllers/ipd';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, ipdValidator } from '@hmis/gatekeeper';

const ipdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

ipdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(ipdValidator.addIpdSchema),
  useRoute(addIpd)
);
ipdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(ipdValidator.updateIpdSchema),
  useRoute(updateIpd)
);
ipdRouter.get('/', checkAuth, useRoute(getAllIpd));
ipdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(ipdValidator.deleteIpdSchema),
  useRoute(getIpdDetails)
);

export default ipdRouter;
