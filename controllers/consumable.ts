import { Router, type Request, type Response } from "express";
import { ConsumableModel } from "../models/consumable";
import type { RequestWithBody } from "./base";
import { ERRORS, Validator, inventoryValidator,  } from "@hmis/gatekeeper";
import { checkAuth } from "../middlewares/auth";

const getAllConsumables = async (req: Request, res: Response) => {
  const consumables = await ConsumableModel.paginate({ deleted: false });
  res.status(200).json(consumables);
};

const getAllConsumablesDeleted = async (req: Request, res: Response) => {
  const consumables = await ConsumableModel.paginate({ deleted: true });
  res.status(200).json(consumables);
};

const addConsumable = async (
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

const removeConsumable = async (
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

const editConsumable = async (
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

const consumableRouter: Router = Router();
const useRoute = ERRORS.useRoute;

consumableRouter.get('/all', checkAuth, useRoute(getAllConsumables));
consumableRouter.post(
  '/add',
  checkAuth,
  Validator.validate(inventoryValidator.createConsumableSchema),
  useRoute(addConsumable)
);
consumableRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(inventoryValidator.updateConsumableSchema),
  useRoute(editConsumable)
);
consumableRouter.post(
  '/remove',
  checkAuth,
  Validator.validate(inventoryValidator.deleteConsumableSchema),
  useRoute(removeConsumable)
);
consumableRouter.get(
  '/removed',
  checkAuth,
  useRoute(getAllConsumablesDeleted)
);

export default consumableRouter
