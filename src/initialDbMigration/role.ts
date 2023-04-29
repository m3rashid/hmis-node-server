import RoleModel from 'models/role'
import type { Types } from 'mongoose'
import { toSentenceCase } from 'utils/strings'
import PermissionModel from 'models/permission'

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
	const adminPermissions = await PermissionModel.find({
		resourceType: 'ALL',
		scope: 'ALL'
	}).select({ _id: 1 })

	defaultRoles.forEach(role => {
		const r = new RoleModel({
			displayName: toSentenceCase(role.name),
			actualName: role.name,
			description: role.description,
			permissions: adminPermissions,
			createdBy: devId,
			lastUpdatedBy: devId
		})
		promises.push(r.save())
	})
	await Promise.all(promises)
}

export default migrateRoles
