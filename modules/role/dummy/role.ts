import mongoose from 'mongoose';
import { RoleModel } from '../models/role';
import { logger } from '../../../utils/logger';
import type { MODELS } from '@hmis/gatekeeper';
import { resourceTypes } from '../../../data/resource';

export const defaultDoctorPermissions: MODELS.IPermission = {
  ADDRESS: { READ: 'ALL' },
  APPOINTMENT: { READ: 'ALL', UPDATE: ['SELF'] },
  AVAILABILITY: {
    CREATE: 'INDEPENDENT',
    READ: 'ALL',
    UPDATE: ['SELF'],
    DELETE: ['SELF'],
  },
  CONSUMABLES: { READ: 'ALL', UPDATE: 'ALL' },
  LEAVE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  NON_CONSUMABLES: { READ: 'ALL', UPDATE: 'ALL' },
  PRESCRIPTION: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  PROFILE: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  ROLE: { READ: 'ALL' },
  USER: { READ: 'ALL', UPDATE: ['SELF'] },
  ATTENDANCE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  ANNOUNCEMENT: { READ: 'ALL' },
  PAYMENT: { READ: 'ALL' },
  OPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  IPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  TESTS: { CREATE: 'ALL', READ: 'ALL', UPDATE: 'ALL' },
  CONFIG: { READ: 'ALL' },
};

export const defaultPatientPermissions: MODELS.IPermission = {
  ADDRESS: { READ: 'ALL', CREATE: 'INDEPENDENT' },
  APPOINTMENT: { READ: ['SELF'] },
  AVAILABILITY: { READ: 'ALL' },
  CONSUMABLES: {},
  LEAVE: { READ: 'ALL' },
  NON_CONSUMABLES: {},
  PRESCRIPTION: { READ: ['SELF'] },
  PROFILE: { CREATE: 'INDEPENDENT', READ: ['SELF'], UPDATE: ['SELF'] },
  ROLE: { READ: ['SELF'] },
  USER: { READ: ['SELF'], UPDATE: ['SELF'] },
  ATTENDANCE: {},
  ANNOUNCEMENT: { READ: 'ALL' },
  PAYMENT: { READ: ['SELF'] },
  OPD: { READ: ['SELF'] },
  IPD: { READ: ['SELF'] },
  TESTS: { READ: ['SELF'] },
  CONFIG: { READ: 'ALL' },
};

export const defaultReceptionistPermissions: MODELS.IPermission = {
  ADDRESS: { READ: 'ALL' },
  APPOINTMENT: {
    CREATE: 'INDEPENDENT',
    READ: 'ALL',
    UPDATE: 'ALL',
    DELETE: 'ALL',
  },
  AVAILABILITY: { READ: 'ALL' },
  CONSUMABLES: { READ: 'ALL' },
  LEAVE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  NON_CONSUMABLES: { READ: 'ALL' },
  PRESCRIPTION: { READ: 'ALL' },
  PROFILE: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL' },
  ROLE: { READ: 'ALL' },
  USER: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  ATTENDANCE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  ANNOUNCEMENT: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  PAYMENT: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  OPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL', DELETE: 'ALL' },
  IPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL', DELETE: 'ALL' },
  TESTS: { CREATE: 'ALL', READ: 'ALL', UPDATE: 'ALL' },
  CONFIG: { READ: 'ALL' },
};

const defaultRoles = [
  {
    name: 'DEVELOPER',
    description:
      'This is the developer role, it has unrestricted access to everything',
  },
  {
    name: 'SUPER_ADMIN',
    description:
      'This is the super-admin of the app, this has unrestricted access to everything (less than developer) visible and functional',
  },
];

const specialRoles = [
  {
    name: 'DOCTOR',
    description:
      'This is the doctor, he/she can handle appointments, consults patients etc',
    permissions: defaultDoctorPermissions,
  },
  {
    name: 'RECEPTIONIST',
    description:
      'This is the receptionist, he/she can schedule,reschedule appointments, answer to queries etc',
    permissions: defaultReceptionistPermissions,
  },
  {
    name: 'PATIENT',
    description:
      'This is the patient role and is given to the patients by default in the hospital',
    permissions: defaultPatientPermissions,
  },
];

export const migrateSpecialRoles = async (devId: string) => {
  const promises: Array<Promise<any>> = [];
  specialRoles.forEach((role) => {
    const r = new RoleModel({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    promises.push(r.save());
  });
  const roles = await Promise.all(promises);
  logger.info('Doctor and Receptionist Roles created');

  return roles.map((role) => ({ name: role.name, _id: role._id }));
};

export const migrateAdminRoles = async (devId: string) => {
  const promises: Array<Promise<any>> = [];
  defaultRoles.forEach((role) => {
    const r = new RoleModel({
      name: role.name,
      description: role.description,
      permissions: resourceTypes.reduce(
        (acc, perm) => ({
          ...acc,
          [perm.name]: [
            ...perm.availablePermissions.independent.map((t) => ({
              [t]: 'INDEPENDENT',
            })),
            ...perm.availablePermissions.actions.map((t) => ({ [t]: 'ALL' })),
          ],
        }),
        {}
      ),
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    promises.push(r.save());
  });

  const roles = await Promise.all(promises);
  logger.info('Admin Roles Migrated');

  return roles.map((role) => ({ name: role.name, _id: role._id }));
};
