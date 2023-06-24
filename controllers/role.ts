import { Router, type Request, type Response } from 'express';

import { RoleModel } from '../models/role';
import { ERRORS, Validator, roleValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from './base';
import { checkAuth } from '../middlewares/auth';

const createRole = async (
  req: RequestWithBody<roleValidator.CreateRoleBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const role = new RoleModel({
    actualName: req.body.name.toUpperCase(),
    displayName: req.body.name,
    description: req.body.description,
    permissions: req.body.permissions,
    createdBy: req.user._id,
  });
  const savedRole = await role.save();
  return res.json(savedRole);
};

const editRole = async (
  req: RequestWithBody<roleValidator.EditRoleBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const role = await RoleModel.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        displayName: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
        lastUpdatedBy: req.user._id,
      },
    },
    { new: true }
  );
  return res.json(role);
};

const deleteRole = async (
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
const getRoles = async (req: Request, res: Response) => {
  const roles = await RoleModel.paginate({ deleted: false });
  return res.json(roles);
};

const getRoleWithDeleted = async (req: Request, res: Response) => {
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

const getRoleDetails = async (
  req: RequestWithBody<roleValidator.DeleteRoleBody>,
  res: Response
) => {
  const role = await RoleModel.aggregate([
    { $match: { _id: req.body._id } },
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
roleRouter.get('/all', checkAuth, useRoute(getRoles));
roleRouter.post('/details', checkAuth, useRoute(getRoleDetails));
roleRouter.get('/all-with-deleted', checkAuth, useRoute(getRoleWithDeleted));

export default roleRouter;
