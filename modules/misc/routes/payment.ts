import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import type { Response } from 'express';
import type { MODELS } from '@hmis/gatekeeper';
import { PaymentModel } from '../models/payment';
import { checkAuth } from '../../../middlewares/auth';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, Validator, paymentValidator } from '@hmis/gatekeeper';

const paymentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

paymentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(paymentValidator.updatePaymentSchema),
  Edit<MODELS.IPayment>(PaymentModel, {})
);

paymentRouter.post('/all', checkAuth, List<MODELS.IPayment>(PaymentModel, {}));

paymentRouter.post(
  '/details',
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

export default paymentRouter;
