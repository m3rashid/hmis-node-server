import type {
  PaginatedRequestQueryParams,
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { IpdModel } from '../models/ipd';
import { ERRORS } from '@hmis/gatekeeper';
import type { MODELS, ipdValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const addIpd = async (
  req: RequestWithBody<ipdValidator.AddIpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newIpd = new IpdModel({ ...req.body, createdBy: req.user._id });
  const ipd = await newIpd.save();
  return res.status(200).json(ipd);
};

export const updateIpd = async (
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

export const getAllIpd = List<MODELS.IIpd>(IpdModel, {});

export const getIpdDetails = async (
  req: RequestWithBody<ipdValidator.DeleteIpdSchemaBody>,
  res: Response
) => {
  const ipdDetails = await IpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(ipdDetails);
};
