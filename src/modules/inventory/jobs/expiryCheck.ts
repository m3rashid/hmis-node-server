import cron from 'node-cron'

import { ConsumableModel } from 'modules/inventory/models/consumable'
import { NonConsumablesModel } from 'modules/inventory/models/nonConsumables'
import { logger } from 'utils/logger'

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

// RUN Job at 12:00 AM everyday
cron.schedule('* * 0 * * *', () => {
	logger.info('Leave Job started')
	expiryCheckOnInventoryJob()
		.then(() => {
			logger.info('Leave Job completed')
		})
		.catch(console.log)
})
