import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { ENUMS } from '@hmis/gatekeeper';
import { PrescriptionModel } from '../models/prescription';

export const createPrescription = async (
  appointmentId: string,
  medicineIds: string[],
  doctorId: string
) => {
  const newPrescription = new PrescriptionModel({
    remarks: faker.lorem.lines({ min: 1, max: 5 }),
    appointment: appointmentId,
    medicines: medicineIds.map((medId) => ({
      medicine: new mongoose.Types.ObjectId(medId),
      dosage: {
        perDay: faker.number.int({ min: 1, max: 5 }),
        timeOfDay: faker.string.fromCharacters(ENUMS.TIME_OF_DAY),
        durationInDays: faker.number.int(),
        perWeek: faker.number.int({ min: 1, max: 7 }),
      },
    })),
    createdBy: new mongoose.Types.ObjectId(doctorId),
  });

  const prescription = await newPrescription.save();
  return prescription._id;
};
