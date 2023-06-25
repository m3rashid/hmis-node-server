import mongoose from 'mongoose';
import { AppointmentModel } from '../models/appointment';
import { faker } from '@faker-js/faker';
import { ENUMS } from '@hmis/gatekeeper';

export const createAppointment = async (
  receptionistId: string,
  doctorId: string,
  patientId: string,
  paymentId: string
) => {
  const newAppointment = new AppointmentModel({
    doctor: new mongoose.Types.ObjectId(doctorId),
    patient: new mongoose.Types.ObjectId(patientId),
    timeMinutes: faker.number.int({ min: 10, max: 60 }),
    status: faker.string.fromCharacters(ENUMS.APPOINTMENT_STATUS),
    payment: new mongoose.Types.ObjectId(paymentId),
    type: faker.string.fromCharacters(ENUMS.APPOINTMENT_TYPE),
    date: faker.date.future(),
    createdBy: new mongoose.Types.ObjectId(receptionistId),
  });
  const appointment = await newAppointment.save();
  return appointment._id;
};
