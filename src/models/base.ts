import mongoose from 'mongoose'
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

export const modelNames = {
	address: 'Address',
	appointment: 'Appointment',
	availability: 'Availability',
	config: 'Config',
	consumable: 'Consumable',
	leave: 'Leave',
	nonConsumable: 'NonConsumable',
	permission: 'Permission',
	prescription: 'Prescription',
	profile: 'Profile',
	resource: 'Resource',
	role: 'Role',
	user: 'User'
} as const

export type IDbSchemaMap = typeof modelNames
export type IDbSchemaKeys = keyof IDbSchemaMap
