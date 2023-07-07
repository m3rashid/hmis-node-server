import type { RequestWithBody } from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { RoleModel } from '../models/role';
import type { MODELS, roleValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

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

export const getRoles = List<MODELS.IRole>(RoleModel, {});

export const getRoleDetails = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  const role = await RoleModel.findById(req.body._id).populate('permissions');
  return res.json(role);
};
