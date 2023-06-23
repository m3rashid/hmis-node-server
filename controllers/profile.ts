import type { Request, Response } from 'express';
import { ProfileModel } from '../models/profile';
import type { RequestWithBody } from './base';
import type { authValidator } from '@hmis/gatekeeper';

export const createProfile = async (
  req: RequestWithBody<authValidator.CreateProfileBody>,
  res: Response
) => {
  const newProfile = new ProfileModel(req.body);
  const profile = await newProfile.save();
  res.status(200).json(profile);
};

export const updateProfile = async (
  req: RequestWithBody<authValidator.UpdateProfileBody>,
  res: Response
) => {
  const profile = await ProfileModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json(profile);
};
