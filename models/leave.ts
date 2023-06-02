import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { Document, IBaseModel, PaginateModel } from 'models'
import { baseModelSchema, modelNames } from 'models'
import type { IUser } from 'models/user'

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
		user: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user, required: true },
		status: { type: String, enum: LEAVE_STATUS, default: 'PENDING' }
	},
	{ timestamps: true }
)

leaveSchema.plugin(paginate)

export const LeaveModel = mongoose.model<Document<ILeave>, PaginateModel<ILeave>>(
	modelNames.leave,
	leaveSchema
)