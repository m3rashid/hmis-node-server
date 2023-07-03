import {
  addConsumable,
  editConsumable,
  getAllConsumables,
  getAllConsumablesDeleted,
  removeConsumable,
} from '../controllers/consumable';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, inventoryValidator } from '@hmis/gatekeeper';

const consumableRouter: Router = Router();
const useRoute = ERRORS.useRoute;

consumableRouter.get('/all', checkAuth, useRoute(getAllConsumables));
consumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createConsumableSchema),
  useRoute(addConsumable)
);
consumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateConsumableSchema),
  useRoute(editConsumable)
);
consumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteConsumableSchema),
  useRoute(removeConsumable)
);
consumableRouter.get('/removed', checkAuth, useRoute(getAllConsumablesDeleted));

export default consumableRouter;
