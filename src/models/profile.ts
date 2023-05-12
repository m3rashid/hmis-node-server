import mongoose from 'mongoose'
import type { IUser } from 'models/user'
import type { ILeave } from 'models/leave'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import type { IAddress } from 'models/address'
import type { IAppointment } from 'models/appointment'
import type { IAvailability } from 'models/availability'
import { baseModelSchema, modelNames } from 'models/base'

export const SEX: readonly string[] = ['M', 'F', 'O']

export const MARITAL_STATUS: readonly string[] = ['S', 'M', 'D', 'W'] // Single, Married, Divorced, Widowed

export const BLOOD_GROUPS: readonly string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export interface IProfile extends IBaseModel {
	bio?: string
	roomNumber?: string
	age?: number
	sex: string
	phone?: string
	phoneVerified: boolean
	maritalStatus?: string
	profilePicture?: string
	addresses?: IAddress[]
	bloodGroup?: string
	origin?: string
	lastVisit?: Date
	designation?: string
	department?: string
	userHealthId?: string
	user: IUser
	leaves: ILeave[]
	availabilities: IAvailability[]
	appointmentsAsDoctor: IAppointment[]
	appointmentsAsPatient: IAppointment[]
	appointmentsAsReferredBy: IAppointment[]
}

const profileSchema = new mongoose.Schema<IProfile>(
	{
		...baseModelSchema,
		bio: { type: String },
		roomNumber: { type: String },
		age: { type: Number },
		sex: { type: String, required: true, enum: SEX },
		phone: { type: String },
		phoneVerified: { type: Boolean, default: false },
		maritalStatus: { type: String, enum: MARITAL_STATUS },
		profilePicture: { type: String },
		addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.address }],
		bloodGroup: { type: String, enum: BLOOD_GROUPS },
		origin: { type: String },
		lastVisit: { type: Date },
		designation: { type: String },
		department: { type: String },
		userHealthId: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.user, required: true },
		leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.leave }],
		availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.availability }],
		appointmentsAsDoctor: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment }],
		appointmentsAsPatient: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment }],
		appointmentsAsReferredBy: [
			{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment }
		]
	},
	{ timestamps: true }
)

profileSchema.plugin(paginate)
export interface IProfileDocument extends Omit<mongoose.Document, '_id'>, IProfile {}

const ProfileModel = mongoose.model<IProfileDocument, mongoose.PaginateModel<IProfileDocument>>(
	modelNames.profile,
	profileSchema
)
export default ProfileModel
