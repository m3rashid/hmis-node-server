import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'
import { baseModelSchema, models } from 'modules/default/model'
import type { IProfile } from 'modules/profile/models/profile'

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
		user: { type: mongoose.Schema.Types.ObjectId, ref: models.profile.name, required: true }
	},
	{ timestamps: true }
)

addressSchema.plugin(paginate)

const AddressModel = mongoose.model<Document<IAddress>, PaginateModel<IAddress>>(
	models.address.name,
	addressSchema
)

export default AddressModel
