import { Router } from 'express';
import Edit from '../../default/edit';
import List from '../../default/list';
import Create from '../../default/create';
import { LeaveModel } from '../models/leave';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { getLeaveDetails } from '../controllers/leave';
import { ERRORS, Validator, leaveValidator } from '@hmis/gatekeeper';

const leaveRouter: Router = Router();
const useRoute = ERRORS.useRoute;

leaveRouter.post(
  '/add',
  checkAuth,
  Validator.validate(leaveValidator.addLeaveSchema),
  useRoute(Create<MODELS.ILeave>(LeaveModel, {}))
);

leaveRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(leaveValidator.updateLeaveSchema),
  useRoute(Edit<MODELS.ILeave>(LeaveModel, {}))
);

leaveRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.ILeave>(LeaveModel, {}))
);

leaveRouter.post(
  '/details',
  checkAuth,
  Validator.validate(leaveValidator.deleteLeaveSchema),
  useRoute(getLeaveDetails)
);

export default leaveRouter;
