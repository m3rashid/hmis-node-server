import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { Document, IBaseModel, PaginateModel } from 'models'
import { baseModelSchema, modelNames } from 'models'
import type { IProfile } from 'models/profile'

export interface IAddress extends IBaseModel {
	city: string
	state: string
	pinCode: string
	country: string
	roomNumber?: string
	buildingNumber?: string
	user: IProfile
}

const addressSchema = new mongoose.Schema<IAddress>(
	{
		...baseModelSchema,
		city: { type: String, required: true },
		state: { type: String, required: true },
		pinCode: { type: String, required: true },
		country: { type: String, default: 'India' },
		roomNumber: { type: String },
		buildingNumber: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.profile, required: true }
	},
	{ timestamps: true }
)

addressSchema.plugin(paginate)

export const AddressModel = mongoose.model<Document<IAddress>, PaginateModel<IAddress>>(
	modelNames.address,
	addressSchema
)