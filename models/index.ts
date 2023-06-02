import mongoose from 'mongoose'

import type { IAddress } from 'models/address'
import type { IAppointment } from 'models/appointment'
import type { IAttendance } from 'models/attendance'
import type { IAvailability } from 'models/availability'
import type { IConsumable } from 'models/consumable'
import type { ILeave } from 'models/leave'
import type { INonConsumable } from 'models/nonConsumables'
import type { INotification } from 'models/notification'
import type { IPrescription } from 'models/prescription'
import type { IProfile } from 'models/profile'
import type { IRole } from 'models/role'
import type { IUser } from 'models/user'

export interface IBaseModel {
	_id: string
	createdAt: Date
	updatedAt: Date
	deleted: boolean
	createdBy?: IUser
	lastUpdatedBy?: IUser
}

export const baseModelSchema = {
	deleted: { type: Boolean, default: false },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}

export type ModelSchemasTypes = Readonly<{
	address: IAddress
	appointment: IAppointment
	availability: IAvailability
	consumable: IConsumable
	leave: ILeave
	nonConsumable: INonConsumable
	prescription: IPrescription
	profile: IProfile
	role: IRole
	user: IUser
	attendance: IAttendance
	notification: INotification
}>

export type Document<T> = Omit<mongoose.Document, '_id'> & T
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>

export type IDbSchemaKeys = keyof ModelSchemasTypes

export const modelNames: Record<IDbSchemaKeys, string> = {
	address: 'Address',
	appointment: 'Appointment',
	availability: 'Availability',
	consumable: 'Consumable',
	leave: 'Leave',
	nonConsumable: 'NonConsumable',
	prescription: 'Prescription',
	profile: 'Profile',
	role: 'Role',
	user: 'User',
	attendance: 'Attendance',
	notification: 'Notification'
}