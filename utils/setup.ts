import { wait } from '../helpers/utils';
import { createAdminUser, createDevUser, updateDevUser } from '../setup/auth';
import { migrateInventory } from '../setup/inventory';
import { migrateRoles } from '../setup/role';
import { logger } from '../utils/logger';

const initialDbMigration = async () => {
  const devUser = await createDevUser();
  if (!devUser) throw new Error('Dev User not created');
  logger.info('Dev User Created');
  const devId = devUser._id;

  await migrateRoles(devId);
  logger.info('Roles Migrated');
  await wait();

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
