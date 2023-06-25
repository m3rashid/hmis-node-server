import { Router, type Request, type Response } from 'express';
import { NonConsumableModel } from '../models/nonConsumables';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { ERRORS, Validator, inventoryValidator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';

const getAllNonConsumables = async (req: PaginatedRequestQueryParams, res: Response) => {
  const nonConsumables = await NonConsumableModel.paginate(
    { deleted: false },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  res.status(200).json(nonConsumables);
};

const getAllNonConsumablesDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const nonConsumables = await NonConsumableModel.paginate(
    { deleted: false },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  res.status(200).json(nonConsumables);
};

const addNonConsumable = async (
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

const removeNonConsumable = async (
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

const editNonConsumable = async (
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

const nonConsumableRouter: Router = Router();
const useRoute = ERRORS.useRoute;

nonConsumableRouter.get('/all', checkAuth, useRoute(getAllNonConsumables));
nonConsumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createNonConsumableSchema),
  useRoute(addNonConsumable)
);
nonConsumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateNonConsumableSchema),
  useRoute(editNonConsumable)
);
nonConsumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteNonConsumableSchema),
  useRoute(removeNonConsumable)
);
nonConsumableRouter.get(
  '/removed',
  checkAuth,
  useRoute(getAllNonConsumablesDeleted)
);

export default nonConsumableRouter;
