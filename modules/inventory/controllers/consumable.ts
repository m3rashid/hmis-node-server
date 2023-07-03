import type {
	PaginatedRequestQueryParams,
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { ConsumableModel } from '../models/consumable';
import type { inventoryValidator } from '@hmis/gatekeeper';

export const getAllConsumables = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const consumables = await ConsumableModel.paginate(
    { deleted: false },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  res.status(200).json(consumables);
};

export const getAllConsumablesDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const consumables = await ConsumableModel.paginate(
    { deleted: true },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  res.status(200).json(consumables);
};

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
