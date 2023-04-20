import { logger } from 'helpers/logger'
import migrateResources from './resources'
import { wait } from 'utils/utils'

const initialDatabaseSetup = async () => {
	try {
		logger.info('Migrating Resources')
		await migrateResources()
		logger.info('Resources Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Permissions')
		await migrateResources()
		logger.info('Permissions Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Roles')
		await migrateResources()
		logger.info('Roles Migrated')
		await wait() // wait for 2 sec

		logger.info('Migrating Users')
		await migrateResources()
		logger.info('Users Migrated')
	} catch (err) {
		console.log(err)
	}
}

export default initialDatabaseSetup
