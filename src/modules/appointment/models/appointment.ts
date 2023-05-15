import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { IUser } from 'modules/auth/models/user'
import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'
import type { IPrescription } from 'modules/prescription/models/prescription'

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
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name, required: true },
		patient: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name, required: true },
		status: { type: String, enum: APPOINTMENT_STATUS, default: 'PENDING' },
		chats: [
			{
				time: { type: Date, required: true },
				remarks: { type: String },
				from: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name, required: true }
			}
		],
		referredBy: { type: mongoose.Schema.Types.ObjectId, ref: models.user.name },
		prescription: { type: mongoose.Schema.Types.ObjectId, ref: models.prescription.name }
	},
	{ timestamps: true }
)

appointmentSchema.plugin(paginate)

const AppointmentModel = mongoose.model<Document<IAppointment>, PaginateModel<IAppointment>>(
	models.appointment.name,
	appointmentSchema
)
export default AppointmentModel