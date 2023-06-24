import { Router, type Request, type Response } from 'express';
import type { RequestWithBody } from './base';
import { ERRORS, Validator, addressValidator } from '@hmis/gatekeeper';
import { AddressModel } from '../models/address';
import { checkAuth } from '../middlewares/auth';

const addAddress = async (
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

const updateAddress = async (
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

const addressRouter: Router = Router();
const useRoute = ERRORS.useRoute;

addressRouter.post(
  '/add',
  checkAuth,
  Validator.validate(addressValidator.createAddressSchema),
  useRoute(addAddress)
);
addressRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(addressValidator.updateAddressSchema),
  useRoute(updateAddress)
);

export default addressRouter;
