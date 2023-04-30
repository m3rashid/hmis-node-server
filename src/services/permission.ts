import UserModel from 'models/user'
import type { PERMISSION } from 'models/role'
import { ALL_RESOURCES, ALL_PERMISSION_SCOPE, SELF_PERMISSION_SCOPE } from 'models/role'

export const hasPermission = async (
	userId: string,
	scope: string,
	resourceType: string,
	requiredPermission: (typeof PERMISSION)[number]
) => {
	if (!userId) return false

	const userRoles = await UserModel.aggregate([
		{ $match: { _id: userId } },
		{ $unwind: '$roles' },
		{
			$lookup: {
				from: 'roles',
				localField: 'roles',
				foreignField: '_id',
				as: 'roles'
			}
		},
		{ $unwind: '$roles' },
		{
			$match: {
				'roles.permissions.permission': { $eq: requiredPermission },
				...(resourceType !== ALL_RESOURCES
					? { 'roles.permissions.resourceType': { $eq: resourceType } }
					: {}),
				// TODO: handle race condition here
				...(scope !== ALL_PERMISSION_SCOPE && scope !== SELF_PERMISSION_SCOPE
					? { 'roles.permissions.scope': { $eq: scope } }
					: {})
			}
		},
		{
			$group: {
				_id: '$_id',
				roles: { $push: '$roles' }
			}
		}
	])

	console.log({ userRoles })

	if (userRoles.length === 0) return false
	return true
}
