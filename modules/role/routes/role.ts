import {
  createRole,
  deleteRole,
  editRole,
  getRoleDetails,
  getRoles,
} from '../controllers/role';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, roleValidator } from '@hmis/gatekeeper';

const roleRouter: Router = Router();
const useRoute = ERRORS.useRoute;

roleRouter.post(
  '/create',
  checkAuth,
  Validator.validate(roleValidator.createRoleSchema),
  useRoute(createRole)
);
roleRouter.post(
  '/delete',
  checkAuth,
  Validator.validate(roleValidator.deleteRoleSchema),
  useRoute(deleteRole)
);
roleRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(roleValidator.editRoleSchema),
  useRoute(editRole)
);
roleRouter.post('/all', checkAuth, useRoute(getRoles));
roleRouter.post('/details', checkAuth, useRoute(getRoleDetails));

export default roleRouter;
