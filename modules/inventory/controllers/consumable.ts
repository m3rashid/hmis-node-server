import type {
  PaginatedRequestQueryParams,
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { ConsumableModel } from '../models/consumable';
import type { MODELS, inventoryValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const getAllConsumables = List<MODELS.IConsumable>(ConsumableModel, {});

export const addConsumable = async (
  req: RequestWithBody<inventoryValidator.CreateConsumableBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const consumable = new ConsumableModel({
    ...req.body,
    createdBy: req.user._id,
  });
  await consumable.save();
  return res.status(200).json(consumable);
};

export const removeConsumable = async (
  req: RequestWithBody<inventoryValidator.DeleteConsumableBody>,
  res: Response
) => {
  const deletedConsumable = await ConsumableModel.findByIdAndUpdate(
    req.body._id,
    { $set: { deleted: true, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(deletedConsumable);
};

export const editConsumable = async (
  req: RequestWithBody<inventoryValidator.UpdateConsumableBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const updatedConsumable = await ConsumableModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(updatedConsumable);
};
