import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import { UserModel } from '../models/user';
import { ERRORS } from '@hmis/gatekeeper';
import type { authValidator } from '@hmis/gatekeeper';
import { issueJWT, revalidateJWT } from '../utils/jwt';

export const login = async (
  req: Request<any, any, authValidator.LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email })
    .populate('roles')
    .populate('roles.permissions')
    .populate('profile')
    .lean();

  if (!user) throw ERRORS.newError('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw ERRORS.newError('Invalid Credentials');

  const { accessToken, refreshToken } = issueJWT(user);
  return res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
};

export const revalidateToken = async (req: Request, res: Response) => {
  const rfToken = req.headers.authorization;
  if (!rfToken) throw ERRORS.newError('No token Provided');

  const { valid, expired, payload } = revalidateJWT(rfToken);
  if (!valid || expired) throw new Error('Unauthorized');
  const userId = (payload?.sub as any)?._id;
  if (!userId) throw ERRORS.newError('No user found');

  const user = await UserModel.findById(userId)
    .populate('roles')
    .populate('roles.permissions')
    .populate('profile')
    .lean();

  if (!user) throw ERRORS.newError('User not found');
  const { accessToken, refreshToken } = issueJWT(user);
  return res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
};

export const logout = async (req: Request, res: Response) => {
  return res.sendStatus(200);
};

export const currentUser = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const currentUserAllDetails = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupUser = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupPatientInit = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupPatientStepTwo = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupPatientFinalize = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const updatePassword = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const forgotPassword = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const resetPassword = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.paginate(
    { deleted: false },
    { populate: 'roles' }
  );
  return res.json(users);
};

export const getAllUsersWithDeleted = async (req: Request, res: Response) => {
  /*
	totalDocs: 0,
	limit: 15,
	totalPages: 1,
	page: 1,
	pagingCounter: 1,
	hasPrevPage: false,
	hasNextPage: false,
	prevPage: null,
	nextPage: null,
	*/
  const users = await UserModel.paginate({}, { populate: 'roles' });
  return res.json(users);
};
