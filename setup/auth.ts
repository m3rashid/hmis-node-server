import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { RoleModel } from '../models/role';
import { UserModel } from '../models/user';

const devUser = {
  name: 'HMIS App',
  email: 'coold1741@gmail.com',
  password: process.env.DEV_PASSWORD as string,
  role: 'DEVELOPER',
};

const adminUser = {
  name: 'MD Rashid Hussain',
  email: 'm3rashid.hussain@gmail.com',
  password: process.env.ADMIN_PASSWORD as string,
  role: 'SUPER_ADMIN',
};

export const createDevUser = async () => {
  const pwd = await bcrypt.hash(devUser.password, 12);
  const dev = new UserModel({
    name: devUser.name,
    email: devUser.email,
    password: pwd,
    roles: [],
  });
  return await dev.save();
};

export const createAdminUser = async (devId: string) => {
  const pwd = await bcrypt.hash(adminUser.password, 12);
  const roles = await RoleModel.find({ actualName: adminUser.role }).select({
    _id: 1,
  });

  const admin = new UserModel({
    name: adminUser.name,
    email: adminUser.email,
    password: pwd,
    roles: roles.map((t) => t._id),
    createdBy: new mongoose.Types.ObjectId(devId),
    lastUpdatedBy: new mongoose.Types.ObjectId(devId),
  });
  return await admin.save();
};

export const updateDevUser = async (devId: string) => {
  const roles = await RoleModel.find({ actualName: devUser.role }).select({
    _id: 1,
  });
  await UserModel.findByIdAndUpdate(devId, {
    roles: roles.map((t) => t._id),
    createdBy: new mongoose.Types.ObjectId(devId),
    lastUpdatedBy: new mongoose.Types.ObjectId(devId),
  });
};
