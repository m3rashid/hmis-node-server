import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModelSchema, modelNames } from 'models/base'
import type { Document, IBaseModel, PaginateModel } from 'models/base'

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

const NonConsumableModel = mongoose.model<Document<INonConsumable>, PaginateModel<INonConsumable>>(
	modelNames.nonConsumable,
	nonConsumableSchema
)
export default NonConsumableModel
