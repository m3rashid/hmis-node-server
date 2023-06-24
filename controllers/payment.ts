import { Router, type Request, type Response } from 'express';
import type { RequestWithBody } from './base';
import { ERRORS, Validator, paymentValidator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { PaymentModel } from '../models/payment';

const addPayment = async (
  req: RequestWithBody<paymentValidator.CreatePaymentSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newPayment = new PaymentModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const payment = await newPayment.save();
  return res.status(200).json(payment);
};

const updatePayment = async (
  req: RequestWithBody<paymentValidator.UpdatePaymentSchemaBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const payment = await PaymentModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(payment);
};

const getAllPayments = async (req: Request, res: Response) => {
  const payment = await PaymentModel.paginate(
    { deleted: false },
    { sort: { createdAt: -1 } }
  );
  return res.status(200).json(payment);
};

const getPaymentDetails = async (
  req: RequestWithBody<paymentValidator.DeletePaymentSchemaBody>,
  res: Response
) => {
  const paymentDetails = await PaymentModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(paymentDetails);
};

const paymentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

paymentRouter.post(
  '/add',
  checkAuth,
  Validator.validate(paymentValidator.createPaymentSchema),
  useRoute(addPayment)
);
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
