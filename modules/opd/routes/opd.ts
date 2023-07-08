import { Router } from 'express';
import Edit from '../../default/edit';
import List from '../../default/list';
import { OpdModel } from '../models/opd';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { getOpdDetails } from '../controllers/opd';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, opdValidator } from '@hmis/gatekeeper';

const opdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

opdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(opdValidator.addOpdSchema),
  useRoute(Create<MODELS.IOpd>(OpdModel, {}))
);

opdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(opdValidator.updateOpdSchema),
  useRoute(Edit<MODELS.IOpd>(OpdModel, {}))
);

opdRouter.post('/all', checkAuth, useRoute(List<MODELS.IOpd>(OpdModel, {})));

opdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(opdValidator.deleteOpdSchema),
  useRoute(getOpdDetails)
);

export default opdRouter;
