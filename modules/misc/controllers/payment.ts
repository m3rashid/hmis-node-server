import type { RequestWithBody } from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { PaymentModel } from '../models/payment';
import type { MODELS, paymentValidator } from '@hmis/gatekeeper';
import List from '../../default/list';

export const updatePayment = async (
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

export const getAllPayments = List<MODELS.IPayment>(PaymentModel, {});

export const getPaymentDetails = async (
  req: RequestWithBody<paymentValidator.DeletePaymentSchemaBody>,
  res: Response
) => {
  const paymentDetails = await PaymentModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(paymentDetails);
};
