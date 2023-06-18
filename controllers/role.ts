import type { Request, Response } from 'express';

import { RoleModel } from 'models/role';
import type {
  CreateRoleBody,
  DeleteRoleBody,
  EditRoleBody,
} from 'validators/role';

export const createRole = async (
  req: Request<any, any, CreateRoleBody>,
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
  req: Request<any, any, EditRoleBody>,
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
  req: Request<any, any, DeleteRoleBody>,
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
  req: Request<any, any, DeleteRoleBody>,
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
