import {
	ERRORS,
  Validator,
  PERMISSION,
	roleValidator,
  permissionBuilder,
  convertPermissionToReadable,
} from '@hmis/gatekeeper';
import Get from '../default/get';
import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Delete from '../default/delete';
import Create from '../default/create';
import { RoleModel } from './models/role';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import { checkAuth } from '../../middlewares/auth';

const roleRouter = Router();
const useRoute = ERRORS.useRoute;
const {
  CREATE,
  DELETE_ALL,
  DELETE_SELF,
  READ_ALL,
  READ_SELF,
  UPDATE_ALL,
  UPDATE_SELF,
} = PERMISSION;

roleRouter.post(
  '/role/create',
  checkAuth,
  Validator.validate(roleValidator.createRoleSchema),
  Create<MODELS.IRole>(RoleModel, {})
);

roleRouter.post(
  '/role/delete',
  checkAuth,
  Validator.validate(roleValidator.deleteRoleSchema),
  Delete<MODELS.IRole>(RoleModel, {})
);

roleRouter.post(
  '/role/edit',
  checkAuth,
  Validator.validate(roleValidator.editRoleSchema),
  Edit<MODELS.IRole>(RoleModel, {})
);

roleRouter.post('/role/all', checkAuth, List<MODELS.IRole>(RoleModel, {}));

roleRouter.post('/role/details', checkAuth, Get<MODELS.IRole>(RoleModel, {}));

roleRouter.get(
  '/resource/all',
  checkAuth,
  useRoute((_: Request, res: Response) => {
    const permissions = Object.entries(
      permissionBuilder({ permission: {}, defaultAccess: 1 })
    ).reduce<MODELS.IPermission>(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          CREATE +
          DELETE_ALL +
          DELETE_SELF +
          READ_ALL +
          READ_SELF +
          UPDATE_ALL +
          UPDATE_SELF,
      }),
      {} as MODELS.IPermission
    );

    const permissionTypes = convertPermissionToReadable(permissions);
    return res.status(200).json(permissionTypes);
  })
);

export default roleRouter
