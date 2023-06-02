import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, modelNames as models } from 'models'
import type { Document, IBaseModel, PaginateModel } from 'models'
import type { IAppointment } from 'models/appointment'
import type { IConsumable } from 'models/consumable'

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
			ref: models.appointment,
			required: true
		},
		medicines: [
			{
				medicine: {
					type: mongoose.Schema.Types.ObjectId,
					ref: models.consumable,
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

export const PrescriptionModel = mongoose.model<
	Document<IPrescription>,
	PaginateModel<IPrescription>
>(models.prescription, prescriptionSchema)