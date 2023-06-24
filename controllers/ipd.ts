import type { Request } from 'express';
import { Router, type Response } from 'express';
import type { RequestWithBody } from './base';
import { ipdValidator } from '@hmis/gatekeeper';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { IpdModel } from '../models/ipd';

const addIpd = async (
  req: RequestWithBody<ipdValidator.AddIpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newIpd = new IpdModel({ ...req.body, createdBy: req.user._id });
  const ipd = await newIpd.save();
  return res.status(200).json(ipd);
};

const updateIpd = async (
  req: RequestWithBody<ipdValidator.UpdateIpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const ipd = await IpdModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(ipd);
};

const getAllIpd = async (req: Request, res: Response) => {
  const ipd = await IpdModel.paginate(
    { deleted: false },
    { sort: { createdAt: -1 } }
  );
  return res.status(200).json(ipd);
};

const getIpdDetails = async (
  req: RequestWithBody<ipdValidator.DeleteIpdSchemaBody>,
  res: Response
) => {
  const ipdDetails = await IpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(ipdDetails);
};

const ipdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

ipdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(ipdValidator.addIpdSchema),
  useRoute(addIpd)
);
ipdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(ipdValidator.updateIpdSchema),
  useRoute(updateIpd)
);
ipdRouter.get('/', checkAuth, useRoute(getAllIpd));
ipdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(ipdValidator.deleteIpdSchema),
  useRoute(getIpdDetails)
);

export default ipdRouter;
