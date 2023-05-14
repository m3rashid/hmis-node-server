import type { Request, Response } from 'express'

export interface IResourceType {
	displayName: string
	actualName: string
	description: string
	availablePermissions: {
		independent: string[]
		actions: string[]
	}
}

export const resourceTypes: readonly IResourceType[] = [
	{
		actualName: 'USER',
		displayName: 'User',
		description: 'Auth users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'PROFILE',
		displayName: 'Profile',
		description: 'Profile of users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'ADDRESS',
		displayName: 'Address',
		description: 'Addresses of users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'PERMISSION',
		displayName: 'Permission',
		description: 'Permissions of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'ROLE',
		displayName: 'Role',
		description: 'Roles of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'AVAILABILITY',
		displayName: 'Availability',
		description: 'Availability of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'LEAVE',
		displayName: 'Leave',
		description: 'Leave applications by the users',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'APPOINTMENT',
		displayName: 'APPOINTMENT',
		description: 'Appointment of two users of different roles',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'CONSUMABLES',
		displayName: 'Consumables',
		description: 'All the items consumed by a patient or the hospital',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'NON_CONSUMABLES',
		displayName: 'Non Consumables',
		description: 'All the items used by the hospital which do not get depleted on use',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'PRESCRIPTION',
		displayName: 'Prescription',
		description: 'All the prescriptions created by the hospital authority',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		actualName: 'CONFIG',
		displayName: 'Config',
		description: 'App Configuration constants deciding the functionality for the entire app',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	}
]

export const getAllResourceTypes = async (req: Request, res: Response) => {
	return res.status(200).json(resourceTypes)
}
