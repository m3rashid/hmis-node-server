import type { Request, Response } from 'express';

import { ConsumableModel } from '../models/consumable';
import { NonConsumableModel } from '../models/nonConsumables';
import type { inventoryValidator } from '@hmis/gatekeeper';

import type { RequestWithBody } from './base';

export const getAllConsumables = async (req: Request, res: Response) => {
  const consumables = await ConsumableModel.paginate({ deleted: false });
  res.status(200).json(consumables);
};

export const getAllNonConsumables = async (req: Request, res: Response) => {
  const nonConsumables = await NonConsumableModel.paginate({ deleted: false });
  res.status(200).json(nonConsumables);
};

export const getAllConsumablesDeleted = async (req: Request, res: Response) => {
  const consumables = await ConsumableModel.paginate({ deleted: true });
  res.status(200).json(consumables);
};

export const getAllNonConsumablesDeleted = async (
  req: Request,
  res: Response
) => {
  const nonConsumables = await NonConsumableModel.paginate({ deleted: false });
  res.status(200).json(nonConsumables);
};

export const addConsumable = async (
  req: RequestWithBody<inventoryValidator.CreateConsumableBody>,
  res: Response
) => {
  const consumable = new ConsumableModel({ ...req.body });
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
  const updatedConsumable = await ConsumableModel.findByIdAndUpdate(
    req.body._id,
    { ...req.body },
    { new: true }
  );
  return res.status(200).json(updatedConsumable);
};

export const addNonConsumable = async (
  req: RequestWithBody<inventoryValidator.CreateNonConsumableBody>,
  res: Response
) => {
  const nonConsumable = new NonConsumableModel({ ...req.body });
  await nonConsumable.save();
  return res.status(200).json(nonConsumable);
};

export const removeNonConsumable = async (
  req: RequestWithBody<inventoryValidator.DeleteNonConsumableBody>,
  res: Response
) => {
  const deletedNonConsumable = await NonConsumableModel.findByIdAndUpdate(
    req.body._id,
    { $set: { deleted: true, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(deletedNonConsumable);
};

export const editNonConsumable = async (
  req: RequestWithBody<inventoryValidator.UpdateNonConsumableBody>,
  res: Response
) => {
  const updatedNonConsumable = await NonConsumableModel.findByIdAndUpdate(
    req.body._id,
    { ...req.body },
    { new: true }
  );
  return res.status(200).json(updatedNonConsumable);
};
