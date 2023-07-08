import type { Response } from 'express';
import { TestModel } from '../models/test';
import type { testValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getTestDetails = async (
  req: RequestWithBody<testValidator.DeleteTestSchemaBody>,
  res: Response
) => {
  const testDetails = await TestModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(testDetails);
};
