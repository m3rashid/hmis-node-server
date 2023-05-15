import mongoose from 'mongoose'

import type { IAppointment } from 'modules/appointment/models/appointment'
import AppointmentModel from 'modules/appointment/models/appointment'
import type { IUser } from 'modules/auth/models/user'
import UserModel from 'modules/auth/models/user'
import type { IAttendance } from 'modules/availability/models/attendance'
import AttendanceModel from 'modules/availability/models/attendance'
import type { IAvailability } from 'modules/availability/models/availability'
import AvailabilityModel from 'modules/availability/models/availability'
import type { ILeave } from 'modules/availability/models/leave'
import LeaveModel from 'modules/availability/models/leave'
import type { IConsumable } from 'modules/inventory/models/consumable'
import ConsumableModel from 'modules/inventory/models/consumable'
import type { INonConsumable } from 'modules/inventory/models/nonConsumables'
import NonConsumableModel from 'modules/inventory/models/nonConsumables'
import type { INotification } from 'modules/notification/models/notifications'
import NotificationModel from 'modules/notification/models/notifications'
import type { IPrescription } from 'modules/prescription/models/prescription'
import PrescriptionModel from 'modules/prescription/models/prescription'
import type { IAddress } from 'modules/profile/models/address'
import AddressModel from 'modules/profile/models/address'
import type { IProfile } from 'modules/profile/models/profile'
import ProfileModel from 'modules/profile/models/profile'
import type { IRole } from 'modules/role/models/role'
import RoleModel from 'modules/role/models/role'

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

export const models: Record<
	IDbSchemaKeys,
	{
		name: string
		db: PaginateModel<ModelSchemas[IDbSchemaKeys]>
	}
> = {
	address: { name: 'Address', db: AddressModel },
	appointment: { name: 'Appointment', db: AppointmentModel },
	availability: { name: 'Availability', db: AvailabilityModel },
	consumable: { name: 'Consumable', db: ConsumableModel },
	leave: { name: 'Leave', db: LeaveModel },
	nonConsumable: { name: 'NonConsumable', db: NonConsumableModel },
	prescription: { name: 'Prescription', db: PrescriptionModel },
	profile: { name: 'Profile', db: ProfileModel },
	role: { name: 'Role', db: RoleModel },
	user: { name: 'User', db: UserModel },
	attendance: { name: 'Attendance', db: AttendanceModel },
	notification: { name: 'Notification', db: NotificationModel }
}
