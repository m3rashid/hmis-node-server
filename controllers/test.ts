import { Router, type Request, type Response } from 'express';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { ERRORS, Validator, testValidator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import {TestModel} from "../models/test"

const addTest = async (
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

const updateTest = async (
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

const getAllTests = async (req: PaginatedRequestQueryParams, res: Response) => {
  const test = await TestModel.paginate(
    { deleted: false },
    {
      sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.status(200).json(test);
};

const getTestDetails = async (
  req: RequestWithBody<testValidator.DeleteTestSchemaBody>,
  res: Response
) => {
  const testDetails = await TestModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(testDetails);
};

const testRouter: Router = Router();
const useRoute = ERRORS.useRoute;

testRouter.post(
  '/add',
  checkAuth,
  Validator.validate(testValidator.addTestSchema),
  useRoute(addTest)
);
testRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(testValidator.updateTestSchema),
  useRoute(updateTest)
);
testRouter.get('/', checkAuth, useRoute(getAllTests));
testRouter.post(
  '/details',
  checkAuth,
  Validator.validate(testValidator.deleteTestSchema),
  useRoute(getTestDetails)
);

export default testRouter;
