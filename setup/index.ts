import { wait } from '../helpers/utils';
import { createAdminUser, createDevUser, updateDevUser } from './auth';
import { migrateInventory } from './inventory';
import { migrateAdminRoles } from './role';
import { logger } from '../utils/logger';
import { migrateSpecialRoles } from './role/specialRoles';

const initialDbMigration = async () => {
  const devUser = await createDevUser();
  if (!devUser) throw new Error('Dev User not created');
  logger.info('Dev User Created');
  const devId = devUser._id;

  await migrateAdminRoles(devId);
  logger.info('Admin Roles Migrated');
  await wait();

  // await migrateSpecialRoles(devId);
  // logger.info('Special Roles Migrated');
  // await wait();

  await createAdminUser(devId);
  logger.info('Admin User Created');
  await wait();

  await updateDevUser(devId);
  logger.info('Dev User Updated');
  await wait();

  await migrateInventory(devId);
  logger.info('Inventory Migrated');
};

export default initialDbMigration;
