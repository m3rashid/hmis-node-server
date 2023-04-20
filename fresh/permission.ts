import type { IPermission } from 'models/permission'
import PermissionModel from 'models/permission'

type PermissionArray = Array<Partial<IPermission>>

const defaultSelfPermissions: PermissionArray = [
	{
		displayName: 'Read All Self',
		description: 'Read access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'READ'
	},
	{
		displayName: 'Update All Self',
		description: 'Edit access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'UPDATE'
	},
	{
		displayName: 'Delete All Self',
		description: 'Delete access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'DELETE'
	},
	{
		displayName: 'Bulk Update All Self',
		description:
			'Bulk Update access on all the self created resources (irrespective of the resource)',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: 'BULK_UPDATE'
	}
]

const adminPermissions: PermissionArray = [
	{
		displayName: 'Read All Admin',
		description: 'Read Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'READ'
	},
	{
		displayName: 'Create All Admin',
		description: 'Create Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'WRITE'
	},
	{
		displayName: 'Update All Admin',
		description: 'Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'UPDATE'
	},
	{
		displayName: 'Delete All Admin',
		description: 'Delete Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'DELETE'
	},
	{
		displayName: 'Bulk Update All Admin',
		description: 'Bulk Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'BULK_UPDATE'
	},
	{
		displayName: 'Bulk Delete All Admin',
		description: 'Edit Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: 'BULK_DELETE'
	}
]

const developerPermissions: PermissionArray = []

const defaultAllPermissions: PermissionArray = [
	...defaultSelfPermissions,
	...adminPermissions,
	...developerPermissions
]

const migratePermissions = async () => {
	const promises: Array<Promise<any>> = []
	defaultAllPermissions.forEach(perm => {
		const p = new PermissionModel({
			displayName: perm.displayName,
			description: perm.description,
			resourceType: perm.resourceType,
			scope: perm.scope,
			permission: perm.permission
		})
		promises.push(p.save())
	})
	await Promise.all(promises)
}

export default migratePermissions
