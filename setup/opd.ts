import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { ENUMS } from '@hmis/gatekeeper';
import { OpdModel } from '../models/opd';

export const createOpd = async (
	appointmentId: string,
  prescriptionId: string,
  paymentId: string,
  receptionistId: string,
) => {
  const newOpd = new OpdModel({
    appointment: new mongoose.Types.ObjectId(appointmentId),
    prescription: new mongoose.Types.ObjectId(prescriptionId),
    status: faker.string.fromCharacters(ENUMS.OPD_STATUS),
    payment: new mongoose.Types.ObjectId(paymentId),
    date: faker.date.anytime(),
    nextDate: faker.date.future(),
    createdBy: new mongoose.Types.ObjectId(receptionistId),
  });

  const opd = await newOpd.save();
  return opd._id;
};
