import { Router } from 'express';
import Edit from '../../default/edit';
import List from '../../default/list';
import type { Response } from 'express';
import Create from '../../default/create';
import { LeaveModel } from '../models/leave';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, Validator, leaveValidator } from '@hmis/gatekeeper';

const leaveRouter: Router = Router();
const useRoute = ERRORS.useRoute;

leaveRouter.post(
  '/add',
  checkAuth,
  Validator.validate(leaveValidator.addLeaveSchema),
  Create<MODELS.ILeave>(LeaveModel, {})
);

leaveRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(leaveValidator.updateLeaveSchema),
  Edit<MODELS.ILeave>(LeaveModel, {})
);

leaveRouter.post('/all', checkAuth, List<MODELS.ILeave>(LeaveModel, {}));

leaveRouter.post(
  '/details',
  checkAuth,
  Validator.validate(leaveValidator.deleteLeaveSchema),
  useRoute(
    async (
      req: RequestWithBody<leaveValidator.DeleteLeaveBody>,
      res: Response
    ) => {
      const leave = await LeaveModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(leave);
    }
  )
);

export default leaveRouter;
