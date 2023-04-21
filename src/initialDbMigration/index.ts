import { wait } from 'utils/utils'
import { logger } from 'helpers/logger'
import migrateResources from './resources'
import migrateRoles from 'initialDbMigration/role'
import migrateUsers from 'initialDbMigration/users'
import migrateConfig from 'initialDbMigration/config'
import migratePermissions from 'initialDbMigration/permission'

const initialDbMigration = async () => {
	try {
		logger.info('Migrating Config')
		await migrateConfig()
		logger.info('Config Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Resources')
		await migrateResources()
		logger.info('Resources Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Permissions')
		await migratePermissions()
		logger.info('Permissions Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Roles')
		await migrateRoles()
		logger.info('Roles Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Users')
		await migrateUsers()
		logger.info('Users Migrated')
	} catch (err) {
		console.log(err)
	}
}

export default initialDbMigration
