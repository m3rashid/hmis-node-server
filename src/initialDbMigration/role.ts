import mongoose from 'mongoose'

import { toSentenceCase } from 'helpers/strings'
import { resourceTypes } from 'modules/resources'
import { RoleModel } from 'modules/role'

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
	defaultRoles.forEach(role => {
		const r = new RoleModel({
			actualName: role.name,
			displayName: toSentenceCase(role.name),
			description: role.description,
			permissions: resourceTypes.reduce(
				(acc, perm) => ({
					...acc,
					[perm.name]: {
						...perm.availablePermissions.independent.map(t => ({ [t]: 'INDEPENDENT' })),
						...perm.availablePermissions.actions.map(t => ({ [t]: 'ALL' }))
					}
				}),
				{}
			),
			createdBy: new mongoose.Types.ObjectId(devId),
			lastUpdatedBy: new mongoose.Types.ObjectId(devId)
		})
		promises.push(r.save())
	})
	await Promise.all(promises)
}

export default migrateRoles
