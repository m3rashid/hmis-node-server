import type {
  PaginatedRequestQueryParams,
  RequestWithBody,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { OpdModel } from '../models/opd';
import type { MODELS, opdValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const addOpd = async (
  req: RequestWithBody<opdValidator.AddOpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newOpd = new OpdModel({ ...req.body, createdBy: req.user._id });
  const opd = await newOpd.save();
  return res.status(200).json(opd);
};

export const updateOpd = async (
  req: RequestWithBody<opdValidator.UpdateOpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const opd = await OpdModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(opd);
};

export const getAllOpd = List<MODELS.IOpd>(OpdModel, {});

export const getOpdDetails = async (
  req: RequestWithBody<opdValidator.DeleteOpdSchemaBody>,
  res: Response
) => {
  const opdDetails = await OpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(opdDetails);
};
