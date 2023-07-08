import type { Response } from 'express';
import { IpdModel } from '../models/ipd';
import type { ipdValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getIpdDetails = async (
  req: RequestWithBody<ipdValidator.DeleteIpdSchemaBody>,
  res: Response
) => {
  const ipdDetails = await IpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(ipdDetails);
};
