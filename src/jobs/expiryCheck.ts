import { logger } from 'helpers/logger'
import ConsumableModel from 'models/consumable'
import NonConsumablesModel from 'models/nonConsumables'
import cron from 'node-cron'

const expiryCheckOnInventoryJob = async () => {
	const consumables = await ConsumableModel.updateMany(
		{
			expiryDate: { $lt: new Date() }
		},
		// TODO: also update the lastUpdatedBy field to the APP user
		{ deleted: true }
	)

	const nonConsumables = await NonConsumablesModel.updateMany(
		{
			nextServicingDate: { $lt: new Date() }
		},
		// TODO: also update the lastUpdatedBy field to the APP user
		{ deleted: true }
	)

	// TODO: send mail to the inventory manager with the list of items that are expiring

	await Promise.all([consumables, nonConsumables])
}

// TODO: Decide how often this job should run
cron.schedule('', () => {
	logger.info('Leave Job started')
	expiryCheckOnInventoryJob()
		.then(() => {
			logger.info('Leave Job completed')
		})
		.catch(console.log)
})
