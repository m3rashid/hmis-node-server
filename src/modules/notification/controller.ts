import type { Request, Response } from 'express'

import NotificationModel from 'modules/notification/models/notifications'

export const getNotifications = async (req: Request, res: Response) => {
	const notifications = await NotificationModel.find({ deleted: false })
	return res.status(200).json(notifications)
}
