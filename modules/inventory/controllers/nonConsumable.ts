import type {
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import type { MODELS, inventoryValidator } from '@hmis/gatekeeper';
import { NonConsumableModel } from '../models/nonConsumable';
import List from '../../default/list';

export const getAllNonConsumables = List<MODELS.INonConsumable>(
  NonConsumableModel,
  {}
);

// export const getAllNonConsumablesDeleted = async (
//   req: PaginatedRequestQueryParams,
//   res: Response
// ) => {
//   const nonConsumables = await NonConsumableModel.paginate(
//     { deleted: false },
//     {
//       $sort: { createdAt: -1 },
//       lean: true,
//       page: req.query.pageNumber,
//       limit: req.query.pageSize,
//     }
//   );
//   res.status(200).json(nonConsumables);
// };

export const addNonConsumable = async (
  req: RequestWithBody<inventoryValidator.CreateNonConsumableBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const nonConsumable = new NonConsumableModel({
    $set: { ...req.body, createdBy: req.user._id },
  });
  await nonConsumable.save();
  return res.status(200).json(nonConsumable);
};

export const removeNonConsumable = async (
  req: RequestWithBody<inventoryValidator.DeleteNonConsumableBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
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
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const updatedNonConsumable = await NonConsumableModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(updatedNonConsumable);
};
