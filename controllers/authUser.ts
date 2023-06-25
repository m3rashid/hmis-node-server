import { Router, type Request, type Response } from 'express';
import { UserModel } from '../models/user';
import { authValidator } from '@hmis/gatekeeper';
import bcrypt from 'bcrypt';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { checkAuth } from '../middlewares/auth';

const getAllInternalUsersWithDeleted = async (
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

const getAllInternalUsers = async (req: PaginatedRequestQueryParams, res: Response) => {
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

const currentUser = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id).lean();
  res.status(200).json(user);
};

const currentUserAllDetails = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id)
    .populate('profile')
    .populate('role')
    .lean();
  res.status(200).json(user);
};

const signupUser = async (
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

const userRouter: Router = Router();
const useRoute = ERRORS.useRoute;

userRouter.get('/all-with-deleted', useRoute(getAllInternalUsersWithDeleted));
userRouter.get('/all', useRoute(getAllInternalUsers));
userRouter.get('/me', checkAuth, useRoute(currentUser));
userRouter.get('/me-details', checkAuth, useRoute(currentUserAllDetails));
userRouter.post(
  '/signup',
  Validator.validate(authValidator.userSignupSchema),
  useRoute(signupUser)
);

export default userRouter;
