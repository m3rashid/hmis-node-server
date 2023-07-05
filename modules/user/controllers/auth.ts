import bcrypt from 'bcrypt';
import { OtpModel } from '../models/otp';
import { ERRORS } from '@hmis/gatekeeper';
import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import type { authValidator } from '@hmis/gatekeeper';
import { issueJWT, revalidateJWT } from '../helpers/jwt';
import type { RequestWithBody } from '../../../helpers/types';

export const login = async (
  req: RequestWithBody<authValidator.LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email })
    .populate('role')
    .populate('role.permissions')
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
    .populate('role')
    .populate('role.permissions')
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

export const updatePassword = async (req: Request, res: Response) => {
  if (!req.user) throw ERRORS.newError('User not found');
  if (req.body.password !== req.body.confirmPassword)
    throw ERRORS.newError('Passwords do not match');
  const hashedPassword = await bcrypt.hash(req.body.confirmPassword, 12);
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: { password: hashedPassword, lastUpdatedBy: req.user._id } },
    { new: true }
  ).lean();
  res.status(200).json(updatedUser);
};

export const forgotPassword = async (
  req: RequestWithBody<authValidator.ForgotPasswordBody>,
  res: Response
) => {
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

export const resetPassword = async (
  req: RequestWithBody<authValidator.ResetPasswordBody>,
  res: Response
) => {
  const otpFound = await OtpModel.findOne({ email: req.body.email }).lean();
  if (!otpFound) throw ERRORS.newError('OTP not found');
  if (otpFound.otp !== req.body.otp) throw ERRORS.newError('Invalid OTP');

  const foundUser = await UserModel.findOne({ email: req.body.email }).lean();
  if (!foundUser) throw ERRORS.newError('User not found');
  // TODO: handle check OTP expiry
  // if (otpFound.expiry < Date.now()) throw ERRORS.newError('OTP expired');

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: hashedPassword, lastUpdatedBy: foundUser._id } },
    { new: true }
  ).lean();
  if (!updatedUser) throw ERRORS.newError('Password not updated');
  res.status(200).json(updatedUser);
};