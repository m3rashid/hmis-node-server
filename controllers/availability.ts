import { Router, type Response } from 'express';
import type { RequestWithBody } from './base';
import { availabilityValidator } from '@hmis/gatekeeper';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { AvailabilityModel } from '../models/availability';

const addAvailability = async (
  req: RequestWithBody<availabilityValidator.CreateAvailabilityBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newAvailability = new AvailabilityModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const availability = await newAvailability.save();
  return res.status(200).json(availability);
};

const updateAvailability = async (
  req: RequestWithBody<availabilityValidator.UpdateAvailabilityBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const availability = await AvailabilityModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(availability);
};

const availabilityRouter: Router = Router();
const useRoute = ERRORS.useRoute;

availabilityRouter.post(
  '/add',
  checkAuth,
  Validator.validate(availabilityValidator.createAvailabilitySchema),
  useRoute(addAvailability)
);
availabilityRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(availabilityValidator.updateAvailabilitySchema),
  useRoute(updateAvailability)
);

export default availabilityRouter;
