import { Router, type Response } from 'express';
import type { RequestWithBody } from './base';
import { UserModel } from '../models/user';
import { ERRORS } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';
import { AvailabilityModel } from '../models/availability';
import { AppointmentModel } from '../models/appointment';
import dayjs from 'dayjs';

const doctorsSearch = async (
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

const getDoctorAvailability = async (
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

const patientSearch = async (
  req: RequestWithBody<{ text: string }>,
  res: Response
) => {
  const foundPatients = await UserModel.find({
    deleted: false,
    isDoctor: false,
    $text: { $search: req.body.text },
  }).lean();

  const patients = foundPatients.map((doc) => ({
    value: doc._id,
    name: doc.name,
    email: doc.email,
    profileId: doc.profile,
  }));

  return res.status(200).json(patients);
};

const searchRouter: Router = Router();
const useRoute = ERRORS.useRoute;

searchRouter.post('/doctors-search', checkAuth, useRoute(doctorsSearch));
searchRouter.post('/patient-search', checkAuth, useRoute(patientSearch));
searchRouter.post(
  '/doctor-timings',
  checkAuth,
  useRoute(getDoctorAvailability)
);

export default searchRouter;
