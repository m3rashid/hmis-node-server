import {
  PERMISSION,
  permissionBuilder,
  convertPermissionToReadable,
} from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';

const {
  CREATE,
  DELETE_ALL,
  DELETE_SELF,
  READ_ALL,
  READ_SELF,
  UPDATE_ALL,
  UPDATE_SELF,
} = PERMISSION;

export const getAllResourceTypes = async (req: Request, res: Response) => {
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
};
