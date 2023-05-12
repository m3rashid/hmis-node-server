import mongoose from 'mongoose'
import RoleModel from 'models/role'
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
	const adminPermissions = await PermissionModel.findOne({ actualName: 'ALL_ADMIN_ALL' })
	if (!adminPermissions) throw new Error('Admin role not found')

	defaultRoles.forEach(role => {
		const r = new RoleModel({
			actualName: role.name,
			displayName: toSentenceCase(role.name),
			description: role.description,
			permissions: [new mongoose.Types.ObjectId(adminPermissions._id)],
			createdBy: new mongoose.Types.ObjectId(devId),
			lastUpdatedBy: new mongoose.Types.ObjectId(devId)
		})
		promises.push(r.save())
	})
	await Promise.all(promises)
}

export default migrateRoles
