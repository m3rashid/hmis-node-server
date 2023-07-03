import type {
  RequestWithBody,
  PaginatedRequestQueryParams,
} from '../../../helpers/types';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import type { authValidator } from '@hmis/gatekeeper';
import { ERRORS } from '@hmis/gatekeeper';

export const getAllInternalUsersWithDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const users = await UserModel.paginate(
    { origin: 'INTERNAL' },
    {
      $sort: { createdAt: -1 },
      lean: true,
      populate: 'role',
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};

export const getAllInternalUsers = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const users = await UserModel.paginate(
    { deleted: false, origin: 'INTERNAL' },
    {
      $sort: { createdAt: -1 },
      lean: true,
      populate: 'role',
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};

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
  res.status(200).json(user);
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
