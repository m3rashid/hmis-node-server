import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import { IpdModel } from '../models/ipd';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { getIpdDetails } from '../controllers/ipd';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, ipdValidator } from '@hmis/gatekeeper';

const ipdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

ipdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(ipdValidator.addIpdSchema),
  useRoute(Create<MODELS.IIpd>(IpdModel, {}))
);

ipdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(ipdValidator.updateIpdSchema),
  useRoute(Edit<MODELS.IIpd>(IpdModel, {}))
);

ipdRouter.post('/all', checkAuth, useRoute(List<MODELS.IIpd>(IpdModel, {})));

ipdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(ipdValidator.deleteIpdSchema),
  useRoute(getIpdDetails)
);

export default ipdRouter;
