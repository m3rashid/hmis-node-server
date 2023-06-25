import { Router, type Request, type Response } from 'express';
import type { PaginatedRequestQueryParams, RequestWithBody } from './base';
import { ERRORS, Validator, prescriptionValidator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import {  } from '../models/payment';
import { PrescriptionModel } from '../models/prescription';

const addPrescription = async (
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

const updatePrescription = async (
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

const getAllPrescriptions = async (req: PaginatedRequestQueryParams, res: Response) => {
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

const getPrescriptionDetails = async (
  req: RequestWithBody<prescriptionValidator.DeletePrescriptionBody>,
  res: Response
) => {
  const prescriptionDetails = await PrescriptionModel.aggregate([
    { $match: { _id: req.body._id } },
  ]);
  return res.status(200).json(prescriptionDetails);
};

const prescriptionRouter: Router = Router();
const useRoute = ERRORS.useRoute;

prescriptionRouter.post(
  '/add',
  checkAuth,
  Validator.validate(prescriptionValidator.createPrescriptionSchema),
  useRoute(addPrescription)
);
prescriptionRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(prescriptionValidator.updatePrescriptionSchema),
  useRoute(updatePrescription)
);
prescriptionRouter.get('/', checkAuth, useRoute(getAllPrescriptions));
prescriptionRouter.post(
  '/details',
  checkAuth,
  Validator.validate(prescriptionValidator.deletePrescriptionSchema),
  useRoute(getPrescriptionDetails)
);

export default prescriptionRouter;
