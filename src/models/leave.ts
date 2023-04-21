import mongoose from 'mongoose'
import type { IUser } from 'models/user'
import { baseModelSchema } from 'models/base'
import type { IBaseModel } from 'models/base'
import paginate from 'mongoose-paginate-v2'

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
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		status: { type: String, enum: LEAVE_STATUS, default: 'PENDING' }
	},
	{ timestamps: true }
)

leaveSchema.plugin(paginate)
interface ILeaveDocument extends Omit<mongoose.Document, '_id'>, ILeave {}

const LeaveModel = mongoose.model<ILeaveDocument, mongoose.PaginateModel<ILeaveDocument>>(
	'Leave',
	leaveSchema
)
export default LeaveModel