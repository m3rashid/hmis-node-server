import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { AddressModel } from '../models/address';
import type { MODELS } from '@hmis/gatekeeper';

export const createAddress = async (userIds: string[]) => {
  const addressPromises: Array<Promise<MODELS.IAddress>> = [];
  for (let i = 0; i < userIds.length; i++) {
    const newAddress = new AddressModel({
      city: faker.location.city(),
      state: faker.location.state(),
      pinCode: faker.location.zipCode(),
      country: faker.location.country(),
      buildingNumber: faker.location.buildingNumber(),
      roomNumber: faker.number.int(),
      user: new mongoose.Types.ObjectId(userIds[i]),
      createdBy: new mongoose.Types.ObjectId(userIds[i]),
    });
    addressPromises.push(newAddress.save());
  }
  const addresses = await Promise.all(addressPromises);
  return addresses.map((t) => t._id);
};
