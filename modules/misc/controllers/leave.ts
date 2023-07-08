import type { Response } from 'express';
import { LeaveModel } from '../models/leave';
import type { leaveValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getLeaveDetails = async (
  req: RequestWithBody<leaveValidator.DeleteLeaveBody>,
  res: Response
) => {
  const leave = await LeaveModel.aggregate([{ $match: { _id: req.body._id } }]);
  return res.status(200).json(leave);
};
