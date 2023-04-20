import { wait } from 'utils/utils'
import migrateRoles from 'fresh/role'
import migrateUsers from 'fresh/users'
import { logger } from 'helpers/logger'
import migrateConfig from 'fresh/config'
import migrateResources from './resources'
import migratePermissions from 'fresh/permission'

const initialDatabaseMigration = async () => {
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

export default initialDatabaseMigration
