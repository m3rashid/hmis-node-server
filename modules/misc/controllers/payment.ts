import type { Response } from 'express';
import { PaymentModel } from '../models/payment';
import type { paymentValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getPaymentDetails = async (
  req: RequestWithBody<paymentValidator.DeletePaymentSchemaBody>,
  res: Response
) => {
  const paymentDetails = await PaymentModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(paymentDetails);
};
