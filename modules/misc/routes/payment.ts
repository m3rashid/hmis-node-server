import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import type { MODELS } from '@hmis/gatekeeper';
import { PaymentModel } from '../models/payment';
import { checkAuth } from '../../../middlewares/auth';
import { getPaymentDetails } from '../controllers/payment';
import { ERRORS, Validator, paymentValidator } from '@hmis/gatekeeper';

const paymentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

paymentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(paymentValidator.updatePaymentSchema),
  useRoute(Edit<MODELS.IPayment>(PaymentModel, {}))
);

paymentRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.IPayment>(PaymentModel, {}))
);

paymentRouter.post(
  '/details',
  checkAuth,
  Validator.validate(paymentValidator.deletePaymentSchema),
  useRoute(getPaymentDetails)
);

export default paymentRouter;
