import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import { ERRORS, convertPermissionToReadable } from '@hmis/gatekeeper';

export const currentUserAllDetails = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id)
    .populate({
      path: 'profile',
      populate: ['addresses', 'availabilities'],
    })
    .populate('role')
    .lean();

  const transformedUser = {
    ...user,
    role: {
      ...user?.role,
      permissions: convertPermissionToReadable(
        JSON.parse(JSON.stringify(user?.role?.permissions))
      ),
    },
  };

  res.status(200).json(transformedUser);
};
