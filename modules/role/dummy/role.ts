import mongoose from 'mongoose';
import { RoleModel } from '../models/role';
import { logger } from '../../../utils/logger';
import { PERMISSION, permissionBuilder } from '@hmis/gatekeeper';

const {
  CREATE,
  DELETE_ALL,
  DELETE_SELF,
  READ_ALL,
  READ_SELF,
  UPDATE_ALL,
  UPDATE_SELF,
} = PERMISSION;

const defaultDoctorPermissions = permissionBuilder({
  permission: {
    appointment: READ_ALL + UPDATE_SELF,
    availability: READ_ALL + UPDATE_SELF + DELETE_SELF,
    prescription: READ_ALL + UPDATE_SELF,
    profile: READ_ALL + UPDATE_SELF,
    user: READ_ALL + UPDATE_SELF,
    opd: READ_ALL + UPDATE_SELF,
    ipd: READ_ALL + UPDATE_SELF,
    announcement: READ_ALL + CREATE,
    test: READ_ALL + CREATE,
  },
  defaultAccess: READ_ALL,
});

const defaultPatientPermissions = permissionBuilder({
  permission: {
    appointment: READ_SELF,
    availability: READ_ALL,
    leave: READ_ALL,
    announcement: READ_ALL,
    user: READ_SELF + UPDATE_SELF,
    profile: READ_SELF + UPDATE_SELF + CREATE,
  },
  defaultAccess: READ_SELF,
});

const defaultReceptionistPermissions = permissionBuilder({
  permission: {
    leave: CREATE,
    appointment: READ_ALL + UPDATE_ALL + DELETE_ALL + CREATE,
    profile: READ_ALL + CREATE + UPDATE_ALL,
    user: READ_ALL + CREATE + UPDATE_SELF,
    attendance: CREATE + READ_ALL,
    announcement: READ_ALL + CREATE,
    payment: CREATE + READ_ALL,
    availability: READ_ALL + UPDATE_ALL + DELETE_ALL + CREATE,
    prescription: READ_ALL + UPDATE_ALL + DELETE_ALL + CREATE,
    test: READ_ALL + CREATE + UPDATE_ALL,
    opd: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    ipd: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
  },
  defaultAccess: READ_ALL,
});

const defaultAdminAndDevPermissions = permissionBuilder({
  permission: {
    address: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    announcement: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    appointment: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    attendance: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    availability: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    consumable: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    goal: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    ipd: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    leave: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    nonConsumable: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    opd: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    otp: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    payment: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    prescription: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    profile: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    project: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    role: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    test: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    subTask: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    task: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    taskStatus: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    user: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
    team: READ_ALL + CREATE + UPDATE_ALL + DELETE_ALL,
  },
  defaultAccess: CREATE,
});

const roles = [
  { name: 'DOCTOR', permissions: defaultDoctorPermissions },
  { name: 'RECEPTIONIST', permissions: defaultReceptionistPermissions },
  { name: 'PATIENT', permissions: defaultPatientPermissions },
  { name: 'DEVELOPER', permissions: defaultAdminAndDevPermissions },
  { name: 'SUPER_ADMIN', permissions: defaultAdminAndDevPermissions },
];

export const migrateRoles = async (devId: string) => {
	const promises: Array<Promise<any>> = [];
	roles.forEach((role) => {
		const r = new RoleModel({
			name: role.name,
			permissions: role.permissions,
			createdBy: new mongoose.Types.ObjectId(devId),
		});
		promises.push(r.save());
	})
	const newRoles = await Promise.all(promises);
	logger.info('All Roles created');
	return newRoles.map((role) => ({ name: role.name, _id: role._id }));
}
