import type {
	RequestWithBody,
  PaginatedRequestQueryParams,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { LeaveModel } from '../models/leave';
import type { MODELS, leaveValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const addLeave = async (
  req: RequestWithBody<leaveValidator.AddLeaveBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newIpd = new LeaveModel({ ...req.body, createdBy: req.user._id });
  const ipd = await newIpd.save();
  return res.status(200).json(ipd);
};

export const updateLeave = async (
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

export const getAllLeaves = List<MODELS.ILeave>(LeaveModel, {});

export const getLeaveDetails = async (
  req: RequestWithBody<leaveValidator.DeleteLeaveBody>,
  res: Response
) => {
  const leave = await LeaveModel.aggregate([{ $match: { _id: req.body._id } }]);
  return res.status(200).json(leave);
};
