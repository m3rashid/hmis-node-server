import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { AvailabilityModel } from '../models/availability';
import type { availabilityValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const addAvailability = async (
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

export const updateAvailability = async (
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
