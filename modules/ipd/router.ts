import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Create from '../default/create';
import type { Response} from 'express';
import { IpdModel } from './models/ipd';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../middlewares/auth';
import type { RequestWithBody } from '../../helpers/types';
import { ERRORS, Validator, ipdValidator } from '@hmis/gatekeeper';

const ipdRouter = Router();
const useRoute = ERRORS.useRoute;

ipdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(ipdValidator.addIpdSchema),
  Create<MODELS.IIpd>(IpdModel, {})
);

ipdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(ipdValidator.updateIpdSchema),
  Edit<MODELS.IIpd>(IpdModel, {})
);

ipdRouter.post('/all', checkAuth, List<MODELS.IIpd>(IpdModel, {}));

ipdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(ipdValidator.deleteIpdSchema),
  useRoute(
    async (
      req: RequestWithBody<ipdValidator.DeleteIpdSchemaBody>,
      res: Response
    ) => {
      const ipdDetails = await IpdModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(ipdDetails);
    }
  )
);

export default ipdRouter;
