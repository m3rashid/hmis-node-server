import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { AddressModel } from '../models/address';
import type { addressValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const addAddress = async (
  req: RequestWithBody<addressValidator.CreateAddressBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newAddress = new AddressModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const address = await newAddress.save();
  return res.status(200).json(address);
};

export const updateAddress = async (
  req: RequestWithBody<addressValidator.UpdateAddressBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const address = await AddressModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(address);
};
