import mongoose from 'mongoose'
import { modelNames } from 'models/base'
import type { IUser } from 'models/user'
import paginate from 'mongoose-paginate-v2'
import type { Document, PaginateModel } from 'models/base'

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
	userId: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user, required: true },
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
	modelNames.attendance,
	attendanceSchema
)
export default AttendanceModel
