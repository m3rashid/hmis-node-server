import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { RoleModel } from '../../models/role';
import { UserModel } from '../../models/user';
import { PATIENT_PASSWORD, devUser, otherUsers } from './helper';
import { logger } from '../../utils/logger';
import { faker } from '@faker-js/faker';
import type { MODELS } from '@hmis/gatekeeper';

export const createDevUser = async () => {
  const pwd = await bcrypt.hash(devUser.password, 12);
  const dev = new UserModel({
    name: devUser.name,
    email: devUser.email,
    password: pwd,
  });
  const user = await dev.save();
  logger.info('Dev user created');
  return user._id;
};

export const updateDevUser = async (devId: string) => {
  const role = await RoleModel.findOne({ name: devUser.role })
	await UserModel.findByIdAndUpdate(devId, {
    role: new mongoose.Types.ObjectId(role?._id),
    createdBy: new mongoose.Types.ObjectId(devId),
    lastUpdatedBy: new mongoose.Types.ObjectId(devId),
  });
  logger.info('Dev User Updated');
};

export const createInternalUsers = async (devId: string) => {
  const users: Array<{ role: string; _id: string }> = [];

  for (let i = 0; i < otherUsers.length; i++) {
    const user = otherUsers[i];
    const pwd = await bcrypt.hash(user.password, 12);
    const role = await RoleModel.findOne({ name: user.role })
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: pwd,
      role: new mongoose.Types.ObjectId(role?._id),
      isDoctor: user.isDoctor,
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    const savedUser = await newUser.save();
    users.push({ _id: savedUser._id, role: user.role });
  }
  return users;
};

const PATIENT_COUNT = 100;
export const createExternalUsers = async (devId: string) => {
  const patientsPromise: Array<Promise<MODELS.IUser>> = [];
  const role = await RoleModel.findOne({ name: 'PATIENT' });
  const password = await bcrypt.hash(PATIENT_PASSWORD, 12);

  for (let i = 0; i < PATIENT_COUNT; i++) {
    const name = faker.internet.displayName();
    const newUser = new UserModel({
      name: name,
      email: faker.internet.exampleEmail({ firstName: name }).toLowerCase(),
      password: password,
      isDoctor: false,
      roles: new mongoose.Types.ObjectId(role?._id),
    });
    patientsPromise.push(newUser.save());
  }
  const patients = await Promise.all(patientsPromise);

  logger.info('Special Users Created');
  return patients.map((t) => t._id);
};
