import { Router } from 'express';
import Edit from '../default/edit';
import List from '../default/list';
import Create from '../default/create';
import Delete from '../default/delete';
import { checkAuth } from '../../middlewares/auth';
import { ConsumableModel } from './models/consumable';
import { NonConsumableModel } from './models/nonConsumable';
import { inventoryValidator, Validator, type MODELS } from '@hmis/gatekeeper';

const inventoryRouter = Router();

inventoryRouter.post(
  '/consumable/all',
  checkAuth,
  List<MODELS.IConsumable>(ConsumableModel, {})
);

inventoryRouter.post(
  '/consumable/add',
  checkAuth,
  Validator.validate(inventoryValidator.createConsumableSchema),
  Create<MODELS.IConsumable>(ConsumableModel, {})
);

inventoryRouter.post(
  '/consumable/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateConsumableSchema),
  Edit<MODELS.IConsumable>(ConsumableModel, {})
);

inventoryRouter.post(
  '/consumable/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteConsumableSchema),
  Delete<MODELS.IConsumable>(ConsumableModel, {})
);

inventoryRouter.post(
  '/consumable/recover',
  checkAuth,
  Validator.validate(inventoryValidator.deleteConsumableSchema),
  Delete<MODELS.IConsumable>(ConsumableModel, { recover: true })
);

inventoryRouter.post(
  '/non-consumable/all',
  checkAuth,
  List<MODELS.INonConsumable>(NonConsumableModel, {})
);

inventoryRouter.post(
  '/non-consumable/add',
  checkAuth,
  Validator.validate(inventoryValidator.createNonConsumableSchema),
  Create<MODELS.INonConsumable>(NonConsumableModel, {})
);

inventoryRouter.post(
  '/non-consumable/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateNonConsumableSchema),
  Edit<MODELS.INonConsumable>(NonConsumableModel, {})
);

inventoryRouter.post(
  '/non-consumable/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  Delete<MODELS.INonConsumable>(NonConsumableModel, {})
);

inventoryRouter.post(
  '/non-consumable/recover',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  Delete<MODELS.INonConsumable>(NonConsumableModel, { recover: true })
);

export default inventoryRouter
