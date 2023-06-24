import mongoose from 'mongoose';

import { resourceTypes } from '../../data/resource';
import { toSentenceCase } from '../../helpers/strings';
import { RoleModel } from '../../models/role';

const specialRoles = [
  {
    name: 'DOCTOR',
    description:
      'This is the doctor, he/she can handle appointments, consults patients etc',
    permissions: {},
  },
  {
    name: 'RECEPTIONIST',
    description:
      'This is the receptionist, he/she can schedule,reschedule appointments, answer to queries etc',
    permissions: {},
  },
];

export const migrateSpecialRoles = async (devId: string) => {
  const promises: Array<Promise<any>> = [];
  specialRoles.forEach((role) => {
    const r = new RoleModel({
      name: role.name,
      description: role.description,
      // permissions: resourceTypes.reduce(
      //   (acc, perm) => ({
      //     ...acc,
      //     [perm.name]: {
      //       ...perm.availablePermissions.independent.map((t) => ({
      //         [t]: 'INDEPENDENT',
      //       })),
      //       ...perm.availablePermissions.actions.map((t) => ({ [t]: 'ALL' })),
      //     },
      //   }),
      //   {}
      // ),
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    promises.push(r.save());
  });
  await Promise.all(promises);
};
