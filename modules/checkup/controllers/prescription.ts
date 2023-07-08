import type { Response } from 'express';
import { PrescriptionModel } from '../models/prescription';
import type { prescriptionValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

export const getPrescriptionDetails = async (
  req: RequestWithBody<prescriptionValidator.DeletePrescriptionBody>,
  res: Response
) => {
  const prescriptionDetails = await PrescriptionModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(prescriptionDetails);
};
