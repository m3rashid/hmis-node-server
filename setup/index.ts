import {
  createDevUser,
  updateDevUser,
  createExternalUsers,
  createInternalUsers,
} from './auth';
import { migrateInventory } from './inventory';
import { migrateAdminRoles } from './role';
import { migrateSpecialRoles } from './role/specialRoles';
import { migrateAnnouncements } from './announcement';
import { createAddress } from './address';
import { migrateProfiles } from './profile';
import { migrateTests } from './test';

const dummyDbMigration = async () => {
  const devUserId = await createDevUser();
  await migrateAdminRoles(devUserId);
  await migrateSpecialRoles(devUserId);
  await migrateTests(devUserId);

  const doctors = await createInternalUsers(devUserId);
  await updateDevUser(devUserId);

  const doctorIds = doctors
    .filter((t) => t.role === 'DOCTOR')
    .map((t) => t._id);
  const doctorAddressIds = await createAddress(doctorIds);
  await migrateProfiles(doctorIds, doctorAddressIds, {
    createAvailabilities: true,
  });

  await migrateInventory(devUserId);
  await migrateAnnouncements(devUserId);
  const patients = await createExternalUsers(devUserId);
  const patientAddressIds = await createAddress(patients);
  await migrateProfiles(patients, patientAddressIds, {
    createAvailabilities: false,
  });
};

export default dummyDbMigration;
