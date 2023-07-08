import { Router } from 'express';
import Get from '../../default/get';
import Edit from '../../default/edit';
import List from '../../default/list';
import Delete from '../../default/delete';
import Create from '../../default/create';
import { RoleModel } from '../models/role';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, roleValidator } from '@hmis/gatekeeper';

const roleRouter: Router = Router();
const useRoute = ERRORS.useRoute;

roleRouter.post(
  '/create',
  checkAuth,
  Validator.validate(roleValidator.createRoleSchema),
  useRoute(Create<MODELS.IRole>(RoleModel, {}))
);

roleRouter.post(
  '/delete',
  checkAuth,
  Validator.validate(roleValidator.deleteRoleSchema),
  useRoute(Delete<MODELS.IRole>(RoleModel, {}))
);

roleRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(roleValidator.editRoleSchema),
  useRoute(Edit<MODELS.IRole>(RoleModel, {}))
);

roleRouter.post('/all', checkAuth, useRoute(List<MODELS.IRole>(RoleModel, {})));

roleRouter.post(
  '/details',
  checkAuth,
  useRoute(Get<MODELS.IRole>(RoleModel, {}))
);

export default roleRouter;
