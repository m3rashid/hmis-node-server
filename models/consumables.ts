import mongoose from 'mongoose'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
import paginate from 'mongoose-paginate-v2'

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
		name: { type: String, required: true },
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
>('Consumable', consumableSchema)
export default ConsumableModel
