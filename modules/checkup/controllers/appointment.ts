import type { Response } from 'express';
import { AppointmentModel } from '../models/appointment';
import type { appointmentValidator } from '@hmis/gatekeeper';
import type { RequestWithBody } from '../../../helpers/types';

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

