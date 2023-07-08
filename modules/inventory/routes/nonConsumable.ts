import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { NonConsumableModel } from '../models/nonConsumable';
import { ERRORS, Validator, inventoryValidator } from '@hmis/gatekeeper';

const nonConsumableRouter: Router = Router();
const useRoute = ERRORS.useRoute;

nonConsumableRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.INonConsumable>(NonConsumableModel, {}))
);

nonConsumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createNonConsumableSchema),
  useRoute(Create<MODELS.INonConsumable>(NonConsumableModel, {}))
);

nonConsumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateNonConsumableSchema),
  useRoute(Edit<MODELS.INonConsumable>(NonConsumableModel, {}))
);

nonConsumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  useRoute(Delete<MODELS.INonConsumable>(NonConsumableModel, {}))
);

export default nonConsumableRouter;
