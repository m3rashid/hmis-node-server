import mongoose from 'mongoose';

import { logger } from '../../utils/logger';
import { RoleModel } from '../../models/role';
import { defaultDoctorPermissions } from './doctor';
import { defaultPatientPermissions } from './patient';
import { defaultReceptionistPermissions } from './receptionist';

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
		name: "PATIENT",
		description: "This is the patient role and is given to the patients by default in the hospital",
		permissions: defaultPatientPermissions
	}
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
