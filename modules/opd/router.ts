import { Router } from 'express';
import Edit from '../default/edit';
import List from '../default/list';
import Create from '../default/create';
import type { Response } from 'express';
import { OpdModel } from './models/opd';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../middlewares/auth';
import type { RequestWithBody } from '../../helpers/types';
import { ERRORS, Validator, opdValidator } from '@hmis/gatekeeper';

const opdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

opdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(opdValidator.addOpdSchema),
  Create<MODELS.IOpd>(OpdModel, {})
);

opdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(opdValidator.updateOpdSchema),
  Edit<MODELS.IOpd>(OpdModel, {})
);

opdRouter.post('/all', checkAuth, List<MODELS.IOpd>(OpdModel, {}));

opdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(opdValidator.deleteOpdSchema),
  useRoute(
    async (
      req: RequestWithBody<opdValidator.DeleteOpdSchemaBody>,
      res: Response
    ) => {
      const opdDetails = await OpdModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(opdDetails);
    }
  )
);

export default opdRouter;
