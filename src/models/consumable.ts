import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export interface IConsumable extends IBaseModel {
	name: string
	quantityLeft: number
	quantityPerUnit: number
	batchNumber?: string
	expiryDate?: Date
	manufacturer?: string
	lastOrderDate?: Date
	nextOrderDate?: Date
}

const consumableSchema = new mongoose.Schema<IConsumable>(
	{
		...baseModelSchema,
		name: { type: String, unique: true, required: true },
		quantityLeft: { type: Number, required: true },
		quantityPerUnit: { type: Number, required: true },
		batchNumber: { type: String },
		expiryDate: { type: Date },
		manufacturer: { type: String },
		lastOrderDate: { type: Date },
		nextOrderDate: { type: Date }
	},
	{ timestamps: true }
)

consumableSchema.plugin(paginate)
export interface IConsumableDocument extends Omit<mongoose.Document, '_id'>, IConsumable {}

const ConsumableModel = mongoose.model<
	IConsumableDocument,
	mongoose.PaginateModel<IConsumableDocument>
>(modelNames.consumable, consumableSchema)
export default ConsumableModel
