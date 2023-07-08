import {
  ERRORS,
  Validator,
  type MODELS,
  leaveValidator,
  paymentValidator,
  announcementValidator,
} from '@hmis/gatekeeper';
import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Create from '../default/create';
import type { Response } from 'express';
import { LeaveModel } from './models/leave';
import { PaymentModel } from './models/payment';
import { checkAuth } from '../../middlewares/auth';
import { AnnouncementModel } from './models/announcement';
import type { RequestWithBody } from '../../helpers/types';

const miscRouter = Router();
const useRoute = ERRORS.useRoute;

miscRouter.post(
  '/announcement/all',
  checkAuth,
  List<MODELS.IAnnouncement>(AnnouncementModel, {})
);

miscRouter.post(
  '/announcement/add',
  checkAuth,
  Validator.validate(announcementValidator.createAnnouncementSchema),
  Create<MODELS.IAnnouncement>(AnnouncementModel, {})
);

miscRouter.post(
  '/leave/add',
  checkAuth,
  Validator.validate(leaveValidator.addLeaveSchema),
  Create<MODELS.ILeave>(LeaveModel, {})
);

miscRouter.post(
  '/leave/edit',
  checkAuth,
  Validator.validate(leaveValidator.updateLeaveSchema),
  Edit<MODELS.ILeave>(LeaveModel, {})
);

miscRouter.post('/leave/all', checkAuth, List<MODELS.ILeave>(LeaveModel, {}));

miscRouter.post(
  '/leave/details',
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

miscRouter.post(
  '/payment/edit',
  checkAuth,
  Validator.validate(paymentValidator.updatePaymentSchema),
  Edit<MODELS.IPayment>(PaymentModel, {})
);

miscRouter.post(
  '/payment/all',
  checkAuth,
  List<MODELS.IPayment>(PaymentModel, {})
);

miscRouter.post(
  '/payment/details',
  checkAuth,
  Validator.validate(paymentValidator.deletePaymentSchema),
  useRoute(
    async (
      req: RequestWithBody<paymentValidator.DeletePaymentSchemaBody>,
      res: Response
    ) => {
      const paymentDetails = await PaymentModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(paymentDetails);
    }
  )
);

export default miscRouter;
