import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'

export interface INotification extends IBaseModel {
	title: string
	description: string
}

const notificationSchema = new mongoose.Schema<INotification>(
	{
		...baseModelSchema,
		title: { type: String, required: true },
		description: { type: String, required: true }
	},
	{ timestamps: true }
)

notificationSchema.plugin(paginate)

const NotificationModel = mongoose.model<Document<INotification>, PaginateModel<INotification>>(
	models.notification.name,
	notificationSchema
)
export default NotificationModel
