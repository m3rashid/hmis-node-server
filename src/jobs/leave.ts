import { logger } from 'helpers/logger'
import LeaveModel from 'models/leave'
import cron from 'node-cron'

const leaveJob = async () => {
	await LeaveModel.updateMany(
		{
			endDate: { $lt: new Date() },
			status: {
				$or: ['PENDING', 'ACCEPTED', 'REJECTED']
			}
		},
		{ status: 'ENDED' }
	)
}

// RUN Job at 12:00 AM everyday
cron.schedule('* * 0 * * *', () => {
	logger.info('Leave Job started')
	leaveJob()
		.then(() => {
			logger.info('Leave Job completed')
		})
		.catch(console.log)
})
