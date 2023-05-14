import { wait } from 'utils/utils'
import { logger } from 'helpers/logger'
import migrateRoles from 'initialDbMigration/role'
import migrateInventory from 'initialDbMigration/inventory'
import { createAdminUser, createDevUser, updateDevUser } from 'initialDbMigration/user'

const initialDbMigration = async () => {
	const devUser = await createDevUser()
	if (!devUser) throw new Error('Dev User not created')
	logger.info('Dev User Created')
	const devId = devUser._id

	await migrateRoles(devId)
	logger.info('Roles Migrated')
	await wait()

	await createAdminUser(devId)
	logger.info('Admin User Created')
	await wait()

	await updateDevUser(devId)
	logger.info('Dev User Updated')
	await wait()

	await migrateInventory(devId)
	logger.info('Inventory Migrated')
}

export default initialDbMigration
