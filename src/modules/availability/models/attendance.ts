import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { IUser } from 'modules/auth/models/user'
import { models } from 'modules/default/model'
import type { Document, PaginateModel } from 'modules/default/model'

export interface IAttendance {
	_id: string
	userId: IUser
	date: Date
	slots: Array<{
		from: Date
		to: Date
	}>
}

const attendanceSchema = new mongoose.Schema<IAttendance>({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name, required: true },
	date: { type: Date, required: true },
	slots: [
		{
			from: { type: Date, required: true },
			to: { type: Date, required: true }
		}
	]
})

attendanceSchema.plugin(paginate)

const AttendanceModel = mongoose.model<Document<IAttendance>, PaginateModel<IAttendance>>(
	models.attendance.name,
	attendanceSchema
)
export default AttendanceModel