import { toSentenceCase } from 'utils/strings'
import PermissionModel from 'models/permission'
import type { IPermission } from 'models/permission'

type PermissionArray = Array<Partial<IPermission> & { name: string }>

const defaultSelfPermissions: PermissionArray = [
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

const adminPermissions: PermissionArray = [
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

const developerPermissions: PermissionArray = []

const defaultAllPermissions: PermissionArray = [
	...defaultSelfPermissions,
	...adminPermissions,
	...developerPermissions
]

const migratePermissions = async (devId: string) => {
	const promises: Array<Promise<any>> = []
	defaultAllPermissions.forEach(perm => {
		const p = new PermissionModel({
			displayName: toSentenceCase(perm.name),
			actualName: perm.name,
			description: perm.description,
			resourceType: perm.resourceType,
			scope: perm.scope,
			permission: perm.permission,
			createdBy: devId,
			lastUpdatedBy: devId
		})
		promises.push(p.save())
	})
	await Promise.all(promises)
}

export default migratePermissions
