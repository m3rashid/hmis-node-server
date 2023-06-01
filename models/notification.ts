import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, modelNames as models } from 'models'
import type { Document, IBaseModel, PaginateModel } from 'models'

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

export const NotificationModel = mongoose.model<
	Document<INotification>,
	PaginateModel<INotification>
>(models.notification, notificationSchema)
