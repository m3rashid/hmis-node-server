import type { INotification } from 'modules/notification/models/notifications'
import mongoose from 'mongoose'

import type { IAppointment } from 'modules/appointment/models/appointment'
import type { IUser } from 'modules/auth/models/user'
import type { IAttendance } from 'modules/availability/models/attendance'
import type { IAvailability } from 'modules/availability/models/availability'
import type { ILeave } from 'modules/availability/models/leave'
import type { IConsumable } from 'modules/inventory/models/consumable'
import type { INonConsumable } from 'modules/inventory/models/nonConsumables'
import type { IPrescription } from 'modules/prescription/models/prescription'
import type { IAddress } from 'modules/profile/models/address'
import type { IProfile } from 'modules/profile/models/profile'
import type { IRole } from 'modules/role/models/role'

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

export type ModelSchemas = Readonly<{
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

export type IDbSchemaKeys = keyof ModelSchemas

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
