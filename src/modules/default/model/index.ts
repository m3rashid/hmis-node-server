import mongoose from 'mongoose'

import type { IAppointment } from 'modules/appointment'
import type { IUser } from 'modules/auth'
import type { IAttendance, IAvailability, ILeave } from 'modules/availability'
import type { IConsumable, INonConsumable } from 'modules/inventory'
import type { INotification } from 'modules/notification'
import type { IPrescription } from 'modules/prescription'
import type { IAddress, IProfile } from 'modules/profile'
import type { IRole } from 'modules/role'

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
