import type { Request } from 'express';
import { Router, type Response } from 'express';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { opdValidator } from '@hmis/gatekeeper';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { OpdModel } from '../models/opd';

const addOpd = async (
  req: RequestWithBody<opdValidator.AddOpdSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newOpd = new OpdModel({ ...req.body, createdBy: req.user._id });
  const opd = await newOpd.save();
  return res.status(200).json(opd);
};

const updateOpd = async (
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

const getAllOpd = async (req: PaginatedRequestQueryParams, res: Response) => {
  const opd = await OpdModel.paginate(
    { deleted: false },
    {
      sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.status(200).json(opd);
};

const getOpdDetails = async (
  req: RequestWithBody<opdValidator.DeleteOpdSchemaBody>,
  res: Response
) => {
  const opdDetails = await OpdModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(opdDetails);
};

const opdRouter: Router = Router();
const useRoute = ERRORS.useRoute;

opdRouter.post(
  '/add',
  checkAuth,
  Validator.validate(opdValidator.addOpdSchema),
  useRoute(addOpd)
);
opdRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(opdValidator.updateOpdSchema),
  useRoute(updateOpd)
);
opdRouter.get('/', checkAuth, useRoute(getAllOpd));
opdRouter.post(
  '/details',
  checkAuth,
  Validator.validate(opdValidator.deleteOpdSchema),
  useRoute(getOpdDetails)
);

export default opdRouter;
