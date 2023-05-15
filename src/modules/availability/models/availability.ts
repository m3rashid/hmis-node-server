import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'
import type { IProfile } from 'modules/profile/models/profile'

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
		profile: { type: mongoose.Schema.Types.ObjectId, ref: models.profile.name, required: true }
	},
	{ timestamps: true }
)

availabilitySchema.plugin(paginate)

const AvailabilityModel = mongoose.model<Document<IAvailability>, PaginateModel<IAvailability>>(
	models.availability.name,
	availabilitySchema
)
export default AvailabilityModel
