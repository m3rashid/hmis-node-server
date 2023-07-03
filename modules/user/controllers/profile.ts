import type { Response } from 'express';
import { ProfileModel } from '../models/profile';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, type authValidator } from '@hmis/gatekeeper';

export const createProfile = async (
  req: RequestWithBody<authValidator.CreateProfileBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newProfile = new ProfileModel({ ...req.body, createdBy: req.user._id });
  const profile = await newProfile.save();
  res.status(200).json(profile);
};

export const updateProfile = async (
  req: RequestWithBody<authValidator.UpdateProfileBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const profile = await ProfileModel.findByIdAndUpdate(
    req.body._id,
    { ...req.body, lastUpdatedBy: req.user._id },
    { new: true }
  );
  res.status(200).json(profile);
};
