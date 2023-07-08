import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { ConsumableModel } from '../models/consumable';
import { ERRORS, Validator, inventoryValidator } from '@hmis/gatekeeper';

const consumableRouter: Router = Router();

consumableRouter.post(
  '/all',
  checkAuth,
  List<MODELS.IConsumable>(ConsumableModel, {})
);

consumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createConsumableSchema),
  Create<MODELS.IConsumable>(ConsumableModel, {})
);

consumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateConsumableSchema),
  Edit<MODELS.IConsumable>(ConsumableModel, {})
);

consumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteConsumableSchema),
  Delete<MODELS.IConsumable>(ConsumableModel, {})
);

export default consumableRouter;
