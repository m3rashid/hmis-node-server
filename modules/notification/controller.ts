import type { Request, Response } from 'express'

import { List } from 'modules/default/controllers'
import { NotificationModel } from 'modules/notification/models/notification'

export const getNotifications = async (req: Request, res: Response) => {
	const notifications = await NotificationModel.find({ deleted: false })
	return res.status(200).json(notifications)
}

export const getAllNotifications = List<'notification'>(NotificationModel, {})
