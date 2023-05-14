import type { Request, Response } from 'express'

export interface IResourceType {
	name: string
	description: string
	availablePermissions: {
		independent: string[]
		actions: string[]
	}
}

export const resourceTypes: readonly IResourceType[] = [
	{
		name: 'USER',
		description: 'Auth users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'PROFILE',
		description: 'Profile of users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'ADDRESS',
		description: 'Addresses of users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'PERMISSION',
		description: 'Permissions of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'ROLE',
		description: 'Roles of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'AVAILABILITY',
		description: 'Availability of the users in the domain',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'LEAVE',
		description: 'Leave applications by the users',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'APPOINTMENT',
		description: 'Appointment of two users of different roles',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'CONSUMABLES',
		description: 'All the items consumed by a patient or the hospital',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'NON_CONSUMABLES',
		description: 'All the items used by the hospital which do not get depleted on use',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'PRESCRIPTION',
		description: 'All the prescriptions created by the hospital authority',
		availablePermissions: {
			independent: ['CREATE'],
			actions: ['READ', 'UPDATE', 'UPDATE_MANY', 'DELETE', 'DELETE_MANY']
		}
	},
	{
		name: 'CONFIG',
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
