import { Router, type Request, type Response } from "express";
import { UserModel } from "../models/user";
import { authValidator } from "@hmis/gatekeeper";
import bcrypt from 'bcrypt';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import type { RequestWithBody } from "./base";
import { checkAuth } from "../middlewares/auth";

const getAllUsersWithDeleted = async (req: Request, res: Response) => {
  const users = await UserModel.paginate({}, { populate: 'roles' });
  return res.json(users);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.paginate(
    { deleted: false },
    { populate: 'roles' }
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
    .populate('roles')
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
    roles: req.body.roles,
  });
  await newUser.save();
  res.status(200).json(newUser);
};

const userRouter: Router = Router();
const useRoute = ERRORS.useRoute;

userRouter.get('/all-with-deleted', useRoute(getAllUsersWithDeleted));
userRouter.get('/all', useRoute(getAllUsers));
userRouter.post('/me', checkAuth, useRoute(currentUser));
userRouter.post(
  '/me-details',
  checkAuth,
  useRoute(currentUserAllDetails)
);
userRouter.post(
  '/signup',
  Validator.validate(authValidator.userSignupSchema),
  useRoute(signupUser)
);

export default userRouter;