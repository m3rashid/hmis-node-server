import {
  createDevUser,
  updateDevUser,
  createExternalUsers,
  createInternalUsers,
} from '../modules/user/dummy/auth';
import { migrateRoles } from '../modules/role/dummy/role';
import { migrateTests } from '../modules/checkup/dummy/test';
import { createAddress } from '../modules/user/dummy/address';
import { migrateProfiles } from '../modules/user/dummy/profile';
import { migrateInventory } from '../modules/inventory/dummy/inventory';
import { migrateAnnouncements } from '../modules/misc/dummy/announcement';

const dummyDbMigration = async () => {
  const devUserId = await createDevUser();
  await migrateRoles(devUserId);
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
