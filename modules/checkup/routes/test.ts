import {
  addTest,
  getAllTests,
  getTestDetails,
  updateTest,
} from '../controllers/test';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, testValidator } from '@hmis/gatekeeper';

const testRouter: Router = Router();
const useRoute = ERRORS.useRoute;

testRouter.post(
  '/add',
  checkAuth,
  Validator.validate(testValidator.addTestSchema),
  useRoute(addTest)
);
testRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(testValidator.updateTestSchema),
  useRoute(updateTest)
);
testRouter.post('/all', checkAuth, useRoute(getAllTests));
testRouter.post(
  '/details',
  checkAuth,
  Validator.validate(testValidator.deleteTestSchema),
  useRoute(getTestDetails)
);

export default testRouter;
