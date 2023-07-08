import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import { TestModel } from '../models/test';
import type { MODELS } from '@hmis/gatekeeper';
import { getTestDetails } from '../controllers/test';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, testValidator } from '@hmis/gatekeeper';

const testRouter: Router = Router();
const useRoute = ERRORS.useRoute;

testRouter.post(
  '/add',
  checkAuth,
  Validator.validate(testValidator.addTestSchema),
  useRoute(Create<MODELS.ITest>(TestModel, {}))
);

testRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(testValidator.updateTestSchema),
  useRoute(Edit<MODELS.ITest>(TestModel, {}))
);

testRouter.post('/all', checkAuth, useRoute(List<MODELS.ITest>(TestModel, {})));

testRouter.post(
  '/details',
  checkAuth,
  Validator.validate(testValidator.deleteTestSchema),
  useRoute(getTestDetails)
);

export default testRouter;
