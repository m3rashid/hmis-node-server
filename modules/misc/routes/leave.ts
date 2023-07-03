import {
  addLeave,
  getAllLeaves,
  getLeaveDetails,
  updateLeave,
} from '../controllers/leave';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, leaveValidator } from '@hmis/gatekeeper';

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
