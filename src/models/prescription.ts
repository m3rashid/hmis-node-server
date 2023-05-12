import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import type { IConsumable } from 'models/consumable'
import type { IAppointment } from 'models/appointment'
import { baseModelSchema, modelNames } from 'models/base'

export const TIME_OF_DAY: readonly string[] = ['BM', 'AF'] // before meal, after meal

export interface IPrescription extends IBaseModel {
	remarks?: string
	appointment: IAppointment
	medicines: Array<{
		medicine: IConsumable
		dosage: {
			perDay: number
			timeOfDay?: string
			durationInDays?: number
			perWeek: number // number of days in a week
		}
	}>
}

const prescriptionSchema = new mongoose.Schema<IPrescription>(
	{
		...baseModelSchema,
		remarks: { type: String },
		appointment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: modelNames.appointment,
			required: true
		},
		medicines: [
			{
				medicine: {
					type: mongoose.Schema.Types.ObjectId,
					ref: modelNames.consumable,
					required: true
				},
				dosage: {
					perDay: { type: Number, required: true },
					timeOfDay: { type: String, enum: TIME_OF_DAY },
					durationInDays: { type: Number },
					perWeek: { type: Number, default: 7 }
				}
			}
		]
	},
	{ timestamps: true }
)

prescriptionSchema.plugin(paginate)
export interface IPrescriptionDocument extends Omit<mongoose.Document, '_id'>, IPrescription {}

const PrescriptionModel = mongoose.model<
	IPrescriptionDocument,
	mongoose.PaginateModel<IPrescriptionDocument>
>(modelNames.prescription, prescriptionSchema)
export default PrescriptionModel
