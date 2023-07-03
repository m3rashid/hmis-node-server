import type {
  PaginatedRequestQueryParams,
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { RoleModel } from '../models/role';
import type { roleValidator } from '@hmis/gatekeeper';

export const createRole = async (
  req: RequestWithBody<roleValidator.CreateRoleBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const role = new RoleModel({
    name: req.body.name,
    description: req.body.description,
    permissions: req.body.permissions,
    createdBy: req.user._id,
  });
  const savedRole = await role.save();
  return res.json(savedRole);
};

export const editRole = async (
  req: RequestWithBody<roleValidator.EditRoleBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const role = await RoleModel.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
        lastUpdatedBy: req.user._id,
      },
    },
    { new: true }
  );
  return res.json(role);
};

export const deleteRole = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  await RoleModel.findByIdAndUpdate(
    req.body._id,
    { $set: { deleted: true, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.json('Role deleted successfully');
};

// ERROR: not working
export const getRoles = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const roles = await RoleModel.paginate(
    { deleted: false },
    {
      sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(roles);
};

export const getRoleWithDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const roles = await RoleModel.paginate(
    {},
    {
      sort: { createdAt: -1 },
      populate: 'permissions',
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(roles);
};

export const getRoleDetails = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  const role = await RoleModel.findById(req.body._id).populate('permissions');
  return res.json(role);
};
