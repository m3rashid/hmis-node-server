import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import type { Response} from 'express';
import Create from '../../default/create';
import { TestModel } from '../models/test';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, Validator, testValidator } from '@hmis/gatekeeper';

const testRouter: Router = Router();
const useRoute = ERRORS.useRoute;

testRouter.post(
  '/add',
  checkAuth,
  Validator.validate(testValidator.addTestSchema),
  Create<MODELS.ITest>(TestModel, {})
);

testRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(testValidator.updateTestSchema),
  Edit<MODELS.ITest>(TestModel, {})
);

testRouter.post('/all', checkAuth, List<MODELS.ITest>(TestModel, {}));

testRouter.post(
  '/details',
  checkAuth,
  Validator.validate(testValidator.deleteTestSchema),
  useRoute(
    async (
      req: RequestWithBody<testValidator.DeleteTestSchemaBody>,
      res: Response
    ) => {
      const testDetails = await TestModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(testDetails);
    }
  )
);

export default testRouter;
