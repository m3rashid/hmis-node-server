import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { faker } from '@faker-js/faker';
import { UserModel } from '../models/user';
import { logger } from '../../../utils/logger';
import type { MODELS } from '@hmis/gatekeeper';
import { RoleModel } from '../../role/models/role';


const DEV_PASSWORD = 'dev123';
const ADMIN_PASSWORD = 'admin123';
const DOCTOR_PASSWORD = 'doc123';
export const PATIENT_PASSWORD = 'pat123';
const RECEPTIONIST_PASSWORD = 'rec123';

export const devUser = {
  name: 'HMIS App',
  email: 'dev@hmis.com',
  password: DEV_PASSWORD,
  role: 'DEVELOPER',
  isDoctor: false,
};

export const otherUsers = [
  {
    name: 'Admin',
    email: 'admin@hmis.com',
    password: ADMIN_PASSWORD,
    role: 'SUPER_ADMIN',
    isDoctor: false,
  },
  ...Array(10)
    .fill(0)
    .map(() => {
      const name = faker.internet.displayName();
      return {
        name: faker.person.fullName(),
        email: faker.internet.exampleEmail({ firstName: name }),
        password: DOCTOR_PASSWORD,
        role: 'DOCTOR',
        isDoctor: true,
      };
    }),
  {
    name: 'Receptionist',
    email: 'rec@hmis.com',
    password: RECEPTIONIST_PASSWORD,
    role: 'RECEPTIONIST',
    isDoctor: false,
  },
];


export const createDevUser = async () => {
  const pwd = await bcrypt.hash(devUser.password, 12);
  const dev = new UserModel({
    name: devUser.name,
    email: devUser.email,
    password: pwd,
    origin: 'INTERNAL',
  });
  const user = await dev.save();
  logger.info('Dev user created');
  return user._id;
};

export const updateDevUser = async (devId: string) => {
  const role = await RoleModel.findOne({ name: devUser.role });
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
    const role = await RoleModel.findOne({ name: user.role });
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: pwd,
      role: new mongoose.Types.ObjectId(role?._id),
      emailVerified: faker.datatype.boolean(),
      origin: 'INTERNAL',
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
      emailVerified: faker.datatype.boolean(),
      password: password,
      isDoctor: false,
      role: new mongoose.Types.ObjectId(role?._id),
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    patientsPromise.push(newUser.save());
  }
  const patients = await Promise.all(patientsPromise);

  logger.info('Special Users Created');
  return patients.map((t) => t._id);
};
