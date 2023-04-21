import mongoose from 'mongoose'
import type { IBaseModel } from 'models/base'
import type { IProfile } from 'models/profile'
import { baseModelSchema } from 'models/base'
import paginate from 'mongoose-paginate-v2'

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
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
	},
	{ timestamps: true }
)

addressSchema.plugin(paginate)
interface IAddressDocument extends Omit<mongoose.Document, '_id'>, IAddress {}

const AddressModel = mongoose.model<IAddressDocument, mongoose.PaginateModel<IAddressDocument>>(
	'Address',
	addressSchema
)
export default AddressModel
