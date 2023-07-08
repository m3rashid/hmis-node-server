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

roleRouter.post(
  '/create',
  checkAuth,
  Validator.validate(roleValidator.createRoleSchema),
  Create<MODELS.IRole>(RoleModel, {})
);

roleRouter.post(
  '/delete',
  checkAuth,
  Validator.validate(roleValidator.deleteRoleSchema),
  Delete<MODELS.IRole>(RoleModel, {})
);

roleRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(roleValidator.editRoleSchema),
  Edit<MODELS.IRole>(RoleModel, {})
);

roleRouter.post('/all', checkAuth, List<MODELS.IRole>(RoleModel, {}));

roleRouter.post('/details', checkAuth, Get<MODELS.IRole>(RoleModel, {}));

export default roleRouter;
