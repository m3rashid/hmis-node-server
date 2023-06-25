import mongoose from 'mongoose';
import { logger } from '../../utils/logger';
import { RoleModel } from '../../models/role';
import { resourceTypes } from '../../data/resource';

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
	
	return roles.map((role) => ({ name: role.name, _id: role._id }))
};
