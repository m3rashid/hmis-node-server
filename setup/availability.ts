import dayjs from 'dayjs';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { ENUMS } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { AvailabilityModel } from '../models/availability';

export const createAvailability = async (userId: string) => {
  const availabilityPromises: Array<Promise<MODELS.IAvailability>> = [];

  for (let i = 0; i < ENUMS.DAYS.length; i++) {
    const from = dayjs(faker.date.anytime());
    const to = from.add(8, 'hours');

    const newAvailability = new AvailabilityModel({
      day: ENUMS.DAYS[i],
      startTime: from.toDate(),
      endTime: to.toDate(),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
    });
    availabilityPromises.push(newAvailability.save());
  }

  const availabilities = await Promise.all(availabilityPromises);
  return availabilities.map((t) => t._id);
};
