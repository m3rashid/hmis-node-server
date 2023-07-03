import type {
  RequestWithBody,
  PaginatedRequestQueryParams,
} from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { PrescriptionModel } from '../models/prescription';
import type { prescriptionValidator } from '@hmis/gatekeeper';

export const addPrescription = async (
  req: RequestWithBody<prescriptionValidator.CreatePrescriptionBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newPrescription = new PrescriptionModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const prescription = await newPrescription.save();
  return res.status(200).json(prescription);
};

export const updatePrescription = async (
  req: RequestWithBody<prescriptionValidator.UpdatePrescriptionBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const prescription = await PrescriptionModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(prescription);
};

export const getAllPrescriptions = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const prescription = await PrescriptionModel.paginate(
    { deleted: false },
    {
      sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.status(200).json(prescription);
};

export const getPrescriptionDetails = async (
  req: RequestWithBody<prescriptionValidator.DeletePrescriptionBody>,
  res: Response
) => {
  const prescriptionDetails = await PrescriptionModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(prescriptionDetails);
};
