import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export interface INonConsumable extends IBaseModel {
	name: string
	quantityLeft: number
	manufacturer?: string
	lastServicingDate?: Date
	nextServicingDate?: Date
}

const nonConsumableSchema = new mongoose.Schema<INonConsumable>(
	{
		...baseModelSchema,
		name: { type: String, unique: true, required: true },
		quantityLeft: { type: Number, required: true },
		manufacturer: { type: String },
		lastServicingDate: { type: Date },
		nextServicingDate: { type: Date }
	},
	{ timestamps: true }
)

nonConsumableSchema.plugin(paginate)
export interface INonConsumableDocument extends Omit<mongoose.Document, '_id'>, INonConsumable {}

const NonConsumableModel = mongoose.model<
	INonConsumableDocument,
	mongoose.PaginateModel<INonConsumableDocument>
>(modelNames.nonConsumable, nonConsumableSchema)
export default NonConsumableModel
