import { Router, type Request, type Response } from 'express';
import type { RequestWithBody } from './base';
import { appointmentValidator } from '@hmis/gatekeeper';
import { ERRORS, Validator } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { AppointmentModel } from '../models/appointment';

const addAppointment = async (
  req: RequestWithBody<appointmentValidator.CreateAppointmentBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const newAppointment = new AppointmentModel({
    ...req.body,
    createdBy: req.user._id,
  });
  const appointment = await newAppointment.save();
  return res.status(200).json(appointment);
};

const updateAppointment = async (
  req: RequestWithBody<appointmentValidator.UpdateAppointmentBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const appointment = await AppointmentModel.findByIdAndUpdate(
    req.body._id,
    { $set: { ...req.body, lastUpdatedBy: req.user._id } },
    { new: true }
  );
  return res.status(200).json(appointment);
};

const getAppointmentDetails = async (
  req: RequestWithBody<appointmentValidator.DeleteAppointmentBody>,
  res: Response
) => {
  const appointment = await AppointmentModel.aggregate([
    { $match: { _id: req.body._id } },
    {
      $lookup: {
        from: 'doctor',
        localField: 'doctor',
        foreignField: '_id',
        as: 'doctor',
      },
    },
    {
      $lookup: {
        from: 'profile',
        localField: 'doctor.profile',
        foreignField: '_id',
        as: 'doctor.profile',
      },
    },
    {
      $lookup: {
        from: 'patient',
        localField: 'patient',
        foreignField: '_id',
        as: 'patient',
      },
    },
    {
      $lookup: {
        from: 'profile',
        localField: 'patient.profile',
        foreignField: '_id',
        as: 'patient.profile',
      },
    },
    {
      $lookup: {
        from: 'payment',
        localField: 'payment',
        foreignField: '_id',
        as: 'payment',
      },
    },
  ]);
  return res.status(200).json(appointment);
};

const getAllAppointments = async (req: Request, res: Response) => {
  const appointments = await AppointmentModel.paginate(
    { deleted: false },
    {
      populate: ['doctor', 'patient'],
      lean: true,
      sort: { createdAt: -1 },
    }
  );
  return res.status(200).json(appointments);
};

const appointmentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

appointmentRouter.post(
  '/add',
  checkAuth,
  Validator.validate(appointmentValidator.createAppointmentSchema),
  useRoute(addAppointment)
);
appointmentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(appointmentValidator.updateAppointmentSchema),
  useRoute(updateAppointment)
);
appointmentRouter.post('/details', checkAuth, useRoute(getAppointmentDetails));
appointmentRouter.post('/all', checkAuth, useRoute(getAllAppointments));

export default appointmentRouter;
