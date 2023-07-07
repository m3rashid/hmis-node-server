import type { RequestWithBody } from '../../../helpers/types';
import type { Response } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { AppointmentModel } from '../models/appointment';
import type { appointmentValidator } from '@hmis/gatekeeper';
import List from '../../default/list';
import type { MODELS } from '@hmis/gatekeeper';

export const addAppointment = async (
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

export const updateAppointment = async (
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

export const getAppointmentDetails = async (
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

export const getAllAppointments = List<MODELS.IAppointment>(
  AppointmentModel,
  {}
);
