import { Router, type Request, type Response } from 'express';
import { ProfileModel } from '../models/profile';
import type { RequestWithBody } from './base';
import { ERRORS, Validator, authValidator,  } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';

const createProfile = async (
  req: RequestWithBody<authValidator.CreateProfileBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newProfile = new ProfileModel({...req.body,createdBy: req.user._id });
  const profile = await newProfile.save();
  res.status(200).json(profile);
};

const updateProfile = async (
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

const profileRouter: Router = Router();
const useRoute = ERRORS.useRoute;

profileRouter.post(
  '/create',
  checkAuth,
  Validator.validate(authValidator.createProfileSchema),
  useRoute(createProfile)
);
profileRouter.post(
  '/update',
  checkAuth,
  Validator.validate(authValidator.updateProfileSchema),
  useRoute(updateProfile)
);

export default profileRouter