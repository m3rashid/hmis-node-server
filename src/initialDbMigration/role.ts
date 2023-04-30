import mongoose from 'mongoose'
import RoleModel from 'models/role'
import type { IPermission } from 'models/role'
import { toSentenceCase } from 'utils/strings'
import { adminPermissions } from 'initialDbMigration/permission'

const defaultRoles = [
	{
		name: 'DEVELOPER',
		description: 'This is the developer role, it has unrestricted access to everything'
	},
	{
		name: 'SUPER_ADMIN',
		description:
			'This is the super-admin of the app, this has unrestricted access to everything (less than developer) visible and functional'
	}
]

const migrateRoles = async (devId: string) => {
	const promises: Array<Promise<any>> = []
	const permissions: IPermission[] = adminPermissions.map(perm => ({
		actualName: perm.name,
		displayName: toSentenceCase(perm.name),
		description: perm.description,
		resourceType: perm.resourceType,
		scope: perm.scope,
		permission: perm.permission
	}))

	defaultRoles.forEach(role => {
		const r = new RoleModel({
			displayName: toSentenceCase(role.name),
			actualName: role.name,
			description: role.description,
			permissions,
			createdBy: new mongoose.Types.ObjectId(devId),
			lastUpdatedBy: new mongoose.Types.ObjectId(devId)
		})
		promises.push(r.save())
	})
	await Promise.all(promises)
}

export default migrateRoles
