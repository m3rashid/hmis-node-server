import mongoose from 'mongoose'
import type { IUser } from 'models/user'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import type { IPrescription } from 'models/prescription'
import { baseModelSchema, modelNames } from 'models/base'

export const APPOINTMENT_STATUS: readonly string[] = ['PENDING', 'ACCEPTED', 'REJECTED', 'RESOLVED']

export interface IAppointment extends IBaseModel {
	doctor: IUser
	patient: IUser
	status: string
	chats: Array<{
		time: Date
		remarks?: string
		from: IUser // maybe the receptionist/doctor, to patient
	}>
	referredBy?: IUser
	prescription: IPrescription
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
	{
		...baseModelSchema,
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		status: { type: String, enum: APPOINTMENT_STATUS, default: 'PENDING' },
		chats: [
			{
				time: { type: Date, required: true },
				remarks: { type: String },
				from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
			}
		],
		referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }
	},
	{ timestamps: true }
)

appointmentSchema.plugin(paginate)
interface IAppointmentDocument extends Omit<mongoose.Document, '_id'>, IAppointment {}

const AppointmentModel = mongoose.model<
	IAppointmentDocument,
	mongoose.PaginateModel<IAppointmentDocument>
>(modelNames.appointment, appointmentSchema)
export default AppointmentModel
