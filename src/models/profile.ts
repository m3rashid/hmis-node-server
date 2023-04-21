import mongoose from 'mongoose'
import type { IUser } from 'models/user'
import type { ILeave } from 'models/leave'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
import type { IAddress } from 'models/address'
import type { IAppointment } from 'models/appointment'
import type { IAvailability } from 'models/availability'
import paginate from 'mongoose-paginate-v2'

export const SEX: readonly string[] = ['M', 'F', 'O']

export const MARITAL_STATUS: readonly string[] = ['S', 'M', 'D', 'W'] // Single, Married, Divorced, Widowed

export const BLOOD_GROUPS: readonly string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export interface IProfile extends IBaseModel {
	bio?: string
	roomNumber?: string
	age?: number
	sex: string
	phone?: string
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
		maritalStatus: { type: String, enum: MARITAL_STATUS },
		profilePicture: { type: String },
		addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
		bloodGroup: { type: String, enum: BLOOD_GROUPS },
		origin: { type: String },
		lastVisit: { type: Date },
		designation: { type: String },
		department: { type: String },
		userHealthId: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leave' }],
		availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Availability' }],
		appointmentsAsDoctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
		appointmentsAsPatient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
		appointmentsAsReferredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
	},
	{ timestamps: true }
)

profileSchema.plugin(paginate)
interface IProfileDocument extends Omit<mongoose.Document, '_id'>, IProfile {}

const ProfileModel = mongoose.model<IProfileDocument, mongoose.PaginateModel<IProfileDocument>>(
	'Profile',
	profileSchema
)
export default ProfileModel