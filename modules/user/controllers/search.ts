import dayjs from 'dayjs';
import type { Response } from 'express';
import { UserModel } from '../models/user';
import { AvailabilityModel } from '../models/availability';
import type { RequestWithBody } from '../../../helpers/types';
import { AppointmentModel } from '../../checkup/models/appointment';

export const doctorsSearch = async (
  req: RequestWithBody<{ text: string }>,
  res: Response
) => {
  const foundDoctors = await UserModel.find({
    deleted: false,
    isDoctor: true,
    origin: 'INTERNAL',
    $text: { $search: req.body.text },
  }).lean();

  const doctors = foundDoctors.map((doc) => ({
    value: doc._id,
    name: doc.name,
    email: doc.email,
    profileId: doc.profile,
  }));

  return res.status(200).json(doctors);
};

export const getDoctorAvailability = async (
  req: RequestWithBody<{ _id: string }>,
  res: Response
) => {
  // TODO: merge the two to get doctors slots
  const [doctorAvailability, doctorAppointments] = await Promise.all([
    await AvailabilityModel.find({ user: req.body._id, deleted: false }).lean(),
    await AppointmentModel.find({
      doctor: req.body._id,
      deleted: false,
    }).lean(),
  ]);

  const timeSlots: Array<{ from: Date; to: Date }> = [];
  for (let i = 0; i < doctorAvailability.length; i++) {
    const d = doctorAvailability[i];
    timeSlots.push({ from: new Date(d.startTime), to: new Date(d.endTime) });
  }

  for (let i = 0; i < doctorAppointments.length; i++) {
    const d = doctorAppointments[i];
    timeSlots.push({
      from: new Date(d.date),
      to: new Date(dayjs(d.date).add(d.timeMinutes, 'minutes').toDate()),
    });
  }

  return res.status(200).json(timeSlots);
};

export const patientSearch = async (
  req: RequestWithBody<{ text: string }>,
  res: Response
) => {
  const foundPatients = await UserModel.find({
    deleted: false,
    isDoctor: false,
    $text: { $search: req.body.text || '' },
  }).lean();

  const patients = foundPatients.map((doc) => ({
    value: doc._id,
    name: doc.name,
    email: doc.email,
    profileId: doc.profile,
  }));

  return res.status(200).json(patients);
};
