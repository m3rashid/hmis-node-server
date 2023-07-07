import {
  addNonConsumable,
  editNonConsumable,
  getAllNonConsumables,
  removeNonConsumable,
} from '../controllers/nonConsumable';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, inventoryValidator } from '@hmis/gatekeeper';

const nonConsumableRouter: Router = Router();
const useRoute = ERRORS.useRoute;

nonConsumableRouter.post('/all', checkAuth, useRoute(getAllNonConsumables));
nonConsumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createNonConsumableSchema),
  useRoute(addNonConsumable)
);
nonConsumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateNonConsumableSchema),
  useRoute(editNonConsumable)
);
nonConsumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  useRoute(removeNonConsumable)
);

export default nonConsumableRouter;
