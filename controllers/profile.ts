import type { Request, Response } from 'express';
import { ProfileModel } from '../models/profile';

export const createProfile = async (req: Request, res: Response) => {
  const newProfile = new ProfileModel(req.body);
  const profile = await newProfile.save();
  res.status(200).json(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  const profile = await ProfileModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json(profile);
};
