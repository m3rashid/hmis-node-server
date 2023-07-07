import type { RequestWithBody } from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { TestModel } from '../models/test';
import type { MODELS, testValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const addTest = async (
  req: RequestWithBody<testValidator.AddTestSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newTest = new TestModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const test = await newTest.save();
  return res.status(200).json(test);
};

export const updateTest = async (
  req: RequestWithBody<testValidator.UpdateTestSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const test = await TestModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(test);
};

// export const getAllTests = async (
//   req: PaginatedRequestQueryParams,
//   res: Response
// ) => {
//   const test = await TestModel.paginate(
//     { deleted: false },
//     {
//       sort: { createdAt: -1 },
//       lean: true,
//       page: req.query.pageNumber,
//       limit: req.query.pageSize,
//     }
//   );
//   return res.status(200).json(test);
// };
export const getAllTests = List<MODELS.ITest>(TestModel, {});

export const getTestDetails = async (
  req: RequestWithBody<testValidator.DeleteTestSchemaBody>,
  res: Response
) => {
  const testDetails = await TestModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(testDetails);
};
