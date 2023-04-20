import mongoose from 'mongoose'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
import paginate from 'mongoose-paginate-v2'

export const TIME_UNIT: readonly string[] = [
	'MIN', // minutes
	'HR', // hours
	'DAY', // days
	'WK', // weeks
	'MON', // months
	'YR' // years
]

export const NON_CONSUMABLE_TYPE: readonly string[] = [
	'VEH', // vehicles
	'BED', // bedsheets, pillows, and other bed related stuff
	'FUR', // furniture
	'EQP', // Medical equipments
	'OTH' // other
]

export interface INonConsumable extends IBaseModel {
	name: string
	type: string
	quantityLeft: number
	lastServicingDate?: Date
	nextServicingDate?: Date
}

const nonConsumableSchema = new mongoose.Schema<INonConsumable>(
	{
		...baseModelSchema,
		name: { type: String, unique: true, required: true },
		type: { type: String, enum: NON_CONSUMABLE_TYPE, required: true },
		quantityLeft: { type: Number, required: true },
		lastServicingDate: { type: Date },
		nextServicingDate: { type: Date }
	},
	{ timestamps: true }
)

nonConsumableSchema.plugin(paginate)
interface INonConsumableDocument extends Omit<mongoose.Document, '_id'>, INonConsumable {}

const NonConsumableModel = mongoose.model<
	INonConsumableDocument,
	mongoose.PaginateModel<INonConsumableDocument>
>('NonConsumable', nonConsumableSchema)
export default NonConsumableModel
