import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { IAppointment } from 'modules/appointment/models/appointment'
import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'
import type { IConsumable } from 'modules/inventory/models/consumable'

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
			ref: models.appointment.name,
			required: true
		},
		medicines: [
			{
				medicine: {
					type: mongoose.Schema.Types.ObjectId,
					ref: models.consumable.name,
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

const PrescriptionModel = mongoose.model<Document<IPrescription>, PaginateModel<IPrescription>>(
	models.prescription.name,
	prescriptionSchema
)
export default PrescriptionModel
