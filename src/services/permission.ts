import type { PERMISSION } from 'models/permission'
import UserModel from 'models/user'

export const hasPermission = async (
	userId: string,
	roleId: string,
	permission: typeof PERMISSION
) => {
	if (!roleId || !userId || !permission) return false
	const user = await UserModel.findById(userId).populate('roles').lean()
	if (!user) return false

	const role = user.roles.find(role => role._id.toString() === roleId)
	if (!role) return false

	const hasPermission = role.permissions.find(p => p.actualName === (permission as any))
	return !!hasPermission
}
