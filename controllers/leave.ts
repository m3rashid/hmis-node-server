import type { Request } from 'express';
import { Router, type Response } from 'express';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { leaveValidator } from '@hmis/gatekeeper';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { IpdModel } from '../models/ipd';
import { LeaveModel } from '../models/leave';

const addLeave = async (
  req: RequestWithBody<leaveValidator.AddLeaveBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newIpd = new IpdModel({ ...req.body, createdBy: req.user._id });
  const ipd = await newIpd.save();
  return res.status(200).json(ipd);
};

const updateLeave = async (
  req: RequestWithBody<leaveValidator.UpdateLeaveBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const leave = await LeaveModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(leave);
};

const getAllLeaves = async (req: PaginatedRequestQueryParams, res: Response) => {
  const leaves = await LeaveModel.paginate(
    { deleted: false },
    {
      sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.status(200).json(leaves);
};

const getLeaveDetails = async (
  req: RequestWithBody<leaveValidator.DeleteLeaveBody>,
  res: Response
) => {
	const leave = await LeaveModel.aggregate([{$match: { _id: req.body._id }}])
	return res.status(200).json(leave)
};

const leaveRouter: Router = Router();
const useRoute = ERRORS.useRoute;

leaveRouter.post(
  '/add',
  checkAuth,
  Validator.validate(leaveValidator.addLeaveSchema),
  useRoute(addLeave)
);
leaveRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(leaveValidator.updateLeaveSchema),
  useRoute(updateLeave)
);
leaveRouter.get('/', checkAuth, useRoute(getAllLeaves));
leaveRouter.post(
  '/details',
  checkAuth,
  Validator.validate(leaveValidator.deleteLeaveSchema),
  useRoute(getLeaveDetails)
);

export default leaveRouter;
