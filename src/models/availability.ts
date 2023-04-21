import type { IBaseModel } from 'models/base'
import mongoose from 'mongoose'
import { baseModelSchema } from 'models/base'
import type { IProfile } from 'models/profile'
import paginate from 'mongoose-paginate-v2'

export const DAYS: readonly string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export interface IAvailability extends IBaseModel {
	day: string
	startTime: string
	endTime: string
	profile: IProfile
}

const availabilitySchema = new mongoose.Schema<IAvailability>(
	{
		...baseModelSchema,
		day: { type: String, required: true, enum: DAYS },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
		profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
	},
	{ timestamps: true }
)

availabilitySchema.plugin(paginate)
interface IAvailabilityDocument extends Omit<mongoose.Document, '_id'>, IAvailability {}

const AvailabilityModel = mongoose.model<
	IAvailabilityDocument,
	mongoose.PaginateModel<IAvailabilityDocument>
>('Availability', availabilitySchema)
export default AvailabilityModel