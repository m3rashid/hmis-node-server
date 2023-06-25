import { faker } from '@faker-js/faker';
import { ProfileModel } from '../models/profile';
import type { MODELS } from '@hmis/gatekeeper';
import { ENUMS } from '@hmis/gatekeeper';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { createAvailability } from './availability';

export const migrateProfiles = async (
  userIds: string[],
  addressIds: string[],
  { createAvailabilities }: { createAvailabilities: boolean }
) => {
  const profilePromises: Array<Promise<MODELS.IProfile>> = [];
  for (let i = 0; i < userIds.length; i++) {
    const availabilityIds: string[] = [];
    if (createAvailabilities) {
      const availabilities = await createAvailability(userIds[i]);
      availabilities.map((t) => availabilityIds.push(t));
    }

    const newProfile = new ProfileModel({
      bio: faker.string.sample({ min: 100, max: 300 }),
      roomNumber: faker.number.int(),
      age: faker.number.int({ min: 0, max: 100 }),
      sex: faker.string.fromCharacters(ENUMS.SEX),
      phone: faker.phone.number(),
      phoneVerified: faker.datatype.boolean(),
      maritalStatus: faker.string.fromCharacters(ENUMS.MARITAL_STATUS),
      profilePicture: faker.image.url({ height: 50, width: 50 }),
      addresses: [new mongoose.Types.ObjectId(addressIds[i])],
      bloodGroup: faker.string.fromCharacters(ENUMS.BLOOD_GROUPS),
      origin: faker.location.country(),
      lastVisit: faker.date.past(),
      designation: faker.person.jobDescriptor(),
      department: faker.commerce.department(),
      userHealthId: faker.string.nanoid(),
      user: new mongoose.Types.ObjectId(userIds[i]),
      leaves: [],
      availabilities: availabilityIds || [],
      appointmentsAsDoctor: [],
      appointmentsAsPatient: [],
      appointmentsAsReferredBy: [],
      createdBy: new mongoose.Types.ObjectId(userIds[i]),
    });

    profilePromises.push(newProfile.save());
  }

  await Promise.all(profilePromises);
  logger.info('Profiles created Successfully');
};
