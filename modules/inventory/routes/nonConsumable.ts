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

nonConsumableRouter.post(
  '/all',
  checkAuth,
  List<MODELS.INonConsumable>(NonConsumableModel, {})
);

nonConsumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createNonConsumableSchema),
  Create<MODELS.INonConsumable>(NonConsumableModel, {})
);

nonConsumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateNonConsumableSchema),
  Edit<MODELS.INonConsumable>(NonConsumableModel, {})
);

nonConsumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  Delete<MODELS.INonConsumable>(NonConsumableModel, {})
);

export default nonConsumableRouter;
