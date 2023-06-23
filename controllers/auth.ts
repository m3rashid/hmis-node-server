import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import { UserModel } from '../models/user';
import { ERRORS } from '@hmis/gatekeeper';
import type { authValidator } from '@hmis/gatekeeper';
import { issueJWT, revalidateJWT } from '../utils/jwt';
import { OtpModel } from '../models/otp';

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
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id).lean();
  res.status(200).json(user);
};

export const currentUserAllDetails = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  const user = await UserModel.findById(req.user._id)
    .populate('profile')
    .populate('roles')
    .lean();
  res.status(200).json(user);
};

export const signupUser = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.confirmPassword, 12);
	const newUser = new UserModel({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		roles: req.body.roles,
	})
	await newUser.save()
  res.status(200).json(newUser);
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
  if (!req.user) throw ERRORS.newError('User not found');
  if (req.body.password !== req.body.confirmPassword)
    throw ERRORS.newError('Passwords do not match');
  const hashedPassword = await bcrypt.hash(req.body.confirmPassword, 12);
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { password: hashedPassword },
    { new: true }
  ).lean();
  res.status(200).json(updatedUser);
};

export const forgotPassword = async (req: Request, res: Response) => {
  const foundOtp = await OtpModel.findOne({ email: req.body.email }).lean();
  let otp: string;
  if (!foundOtp) {
    otp = String(Math.floor(100000 + Math.random() * 900000));
    const newOtp = new OtpModel({
      email: req.body.email,
      otp,
      expiry: Date.now() + 600000,
    });
    await newOtp.save();
  } else otp = foundOtp?.otp;

  // TODO: send OTP to email
  console.log({ otp });
  res.status(200).json('Otp sent to your email');
};

export const resetPassword = async (req: Request, res: Response) => {
  const otpFound = await OtpModel.findOne({ email: req.body.email }).lean();
  if (!otpFound) throw ERRORS.newError('OTP not found');
  if (otpFound.otp !== req.body.otp) throw ERRORS.newError('Invalid OTP');
  // TODO: handle check OTP expiry
  // if (otpFound.expiry < Date.now()) throw ERRORS.newError('OTP expired');

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: req.body.email },
    { password: hashedPassword },
    { new: true }
  ).lean();
  if (!updatedUser) throw ERRORS.newError('User not found');
  res.status(200).json(updatedUser);
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
