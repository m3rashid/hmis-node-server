import { Router } from 'express'

import { List } from 'modules/default/controllers'
import { NotificationModel } from 'modules/notification/models/notification'

const notificationRouter = Router()

notificationRouter.get(
	'/all',
	List<'notification'>(NotificationModel, {
		skipValidator: true
	})
)

export default notificationRouter
