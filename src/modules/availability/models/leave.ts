import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { IUser } from 'modules/auth/models/user'
import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'

export const LEAVE_STATUS: readonly string[] = ['PENDING', 'ACCEPTED', 'REJECTED', 'ENDED']

export interface ILeave extends IBaseModel {
	startDate: Date
	endDate: Date
	reason: string
	user: IUser
	status: string
}

const leaveSchema = new mongoose.Schema<ILeave>(
	{
		...baseModelSchema,
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		reason: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name, required: true },
		status: { type: String, enum: LEAVE_STATUS, default: 'PENDING' }
	},
	{ timestamps: true }
)

leaveSchema.plugin(paginate)

const LeaveModel = mongoose.model<Document<ILeave>, PaginateModel<ILeave>>(
	models.leave.name,
	leaveSchema
)
export default LeaveModel
