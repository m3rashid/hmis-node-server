import type { PERMISSION } from 'models/role'

type IPermissionArray = Array<{
	name: string
	description: string
	resourceType: string
	scope: string
	permission: (typeof PERMISSION)[number]
}>

export const defaultSelfPermissions: IPermissionArray = [
	{
		name: 'READ_ALL_SELF',
		description: 'Read access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'READ'
	},
	{
		name: 'UPDATE_ALL_SELF',
		description: 'Edit access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'UPDATE'
	},
	{
		name: 'DELETE_ALL_SELF',
		description: 'Delete access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'DELETE'
	},
	{
		name: 'BULK_UPDATE_ALL_SELF',
		description:
			'Bulk Update access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'BULK_UPDATE'
	}
]

export const adminPermissions: IPermissionArray = [
	{
		name: 'READ_ALL_ADMIN',
		description: 'Read Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'READ'
	},
	{
		name: 'CREATE_ALL_ADMIN',
		description: 'Create Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'WRITE'
	},
	{
		name: 'UPDATE_ALL_ADMIN',
		description: 'Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'UPDATE'
	},
	{
		name: 'DELETE_ALL_ADMIN',
		description: 'Delete Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'DELETE'
	},
	{
		name: 'BULK_UPDATE_ALL_ADMIN',
		description: 'Bulk Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'BULK_UPDATE'
	},
	{
		name: 'BULK_DELETE_ALL_ADMIN',
		description: 'Edit Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'BULK_DELETE'
	}
]

export const developerPermissions: IPermissionArray = []
