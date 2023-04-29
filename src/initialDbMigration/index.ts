import { wait } from 'utils/utils'
import { logger } from 'helpers/logger'
import migrateResources from './resource'
import migrateRoles from 'initialDbMigration/role'
import migrateConfig from 'initialDbMigration/config'
import migrateInventory from 'initialDbMigration/inventory'
import migratePermissions from 'initialDbMigration/permission'
import { createAdminUser, createDevUser, updateDevUser } from 'initialDbMigration/user'

/**
 * Migration order:
 * 1. User : Create the dev user and return it, to be used in other fields' `createdBy`
 * 2. Config
 * 3. Resource
 * 4. Permission
 * 5. Role
 * 6. User : Creating an admin user
 * 7. User : Update dev user to assign the dev role
 * 8. Inventory
 */

const initialDbMigration = async () => {
	try {
		const devUser = await createDevUser()
		if (!devUser) throw new Error('Dev User not created')
		logger.info('Dev User Created')
		const devId = devUser._id

		await migrateConfig(devId)
		logger.info('Config Migrated')
		await wait()

		await migrateResources(devId)
		logger.info('Resources Migrated')
		await wait()

		await migratePermissions(devId)
		logger.info('Permissions Migrated')
		await wait()

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
	} catch (err) {
		console.log(err)
	}
}

export default initialDbMigration
