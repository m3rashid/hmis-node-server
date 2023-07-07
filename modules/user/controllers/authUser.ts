import type { RequestWithBody } from '../../../helpers/types';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import type { MODELS, authValidator } from '@hmis/gatekeeper';
import { ERRORS, convertPermissionToReadable } from '@hmis/gatekeeper';
import List from '../../default/list';

export const getAllInternalUsers = List<MODELS.IUser>(UserModel, {});

export const currentUser = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id).lean();
  res.status(200).json(user);
};

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

export const signupUser = async (
  req: RequestWithBody<authValidator.UserSignupBody>,
  res: Response
) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });
  await newUser.save();
  res.status(200).json(newUser);
};
