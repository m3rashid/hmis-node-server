import {
  getAllPayments,
  getPaymentDetails,
  updatePayment,
} from '../controllers/payment';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, paymentValidator } from '@hmis/gatekeeper';

const paymentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

// paymentRouter.post(
//   '/add',
//   checkAuth,
//   Validator.validate(paymentValidator.createPaymentSchema),
//   useRoute(addPayment)
// );
paymentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(paymentValidator.updatePaymentSchema),
  useRoute(updatePayment)
);
paymentRouter.get('/', checkAuth, useRoute(getAllPayments));
paymentRouter.post(
  '/details',
  checkAuth,
  Validator.validate(paymentValidator.deletePaymentSchema),
  useRoute(getPaymentDetails)
);

export default paymentRouter;
