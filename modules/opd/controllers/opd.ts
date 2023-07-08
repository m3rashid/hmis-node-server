import type { Response } from 'express';
import { OpdModel } from '../models/opd';
import type { opdValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getOpdDetails = async (
  req: RequestWithBody<opdValidator.DeleteOpdSchemaBody>,
  res: Response
) => {
  const opdDetails = await OpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(opdDetails);
};
