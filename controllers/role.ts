import type { Request, Response } from 'express';

import { RoleModel } from '../models/role';
import type { roleValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from './base';

export const createRole = async (
  req: RequestWithBody<roleValidator.CreateRoleBody>,
  res: Response
) => {
  const { name, description, permissions } = req.body;
  const role = new RoleModel({
    actualName: name.toUpperCase(),
    displayName: name,
    description,
    permissions,
  });
  const savedRole = await role.save();
  return res.json(savedRole);
};

export const editRole = async (
  req: RequestWithBody<roleValidator.EditRoleBody>,
  res: Response
) => {
  const { name, description, permissions, roleId } = req.body;
  const role = await RoleModel.findByIdAndUpdate(
    roleId,
    { displayName: name, description, permissions },
    { new: true }
  );
  return res.json(role);
};

export const deleteRole = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  const { roleId } = req.body;
  await RoleModel.findByIdAndUpdate(roleId, { deleted: true }, { new: true });
  return res.json('Role deleted successfully');
};

// ERROR: not working
export const getRoles = async (req: Request, res: Response) => {
  const roles = await RoleModel.paginate({ deleted: false });
  return res.json(roles);
};

export const getRoleWithDeleted = async (req: Request, res: Response) => {
  const roles = await RoleModel.aggregate([
    {
      $lookup: {
        from: 'permissions',
        localField: 'permissions',
        foreignField: '_id',
        as: 'permissions',
      },
    },
  ]);
  return res.json(roles);
};

export const getRoleDetails = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  const { roleId } = req.body;
  const role = await RoleModel.aggregate([
    { $match: { _id: roleId } },
    {
      $lookup: {
        from: 'permissions',
        localField: 'permissions',
        foreignField: '_id',
        as: 'permissions',
      },
    },
  ]);
  return res.json(role);
};
