import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export const CONSUMABLE_TYPE: readonly string[] = [
	'TAB', // Tablet
	'SYR', // Syrup
	'DRS', // Dressing material
	'SS', // normal saline solution,
	'TST' // testing kits
]

export interface IConsumable extends IBaseModel {
	name: string
	type: string
	quantityLeft: number
	quantityPerUnit: number
	batchNumber?: string
	expiryDate?: Date
	manufacturer?: string
}

const consumableSchema = new mongoose.Schema<IConsumable>(
	{
		...baseModelSchema,
		name: { type: String, unique: true, required: true },
		type: { type: String, enum: CONSUMABLE_TYPE, required: true },
		quantityLeft: { type: Number, required: true },
		quantityPerUnit: { type: Number, required: true },
		batchNumber: { type: String },
		expiryDate: { type: Date },
		manufacturer: { type: String }
	},
	{ timestamps: true }
)

consumableSchema.plugin(paginate)
interface IConsumableDocument extends Omit<mongoose.Document, '_id'>, IConsumable {}

const ConsumableModel = mongoose.model<
	IConsumableDocument,
	mongoose.PaginateModel<IConsumableDocument>
>(modelNames.consumable, consumableSchema)
export default ConsumableModel
