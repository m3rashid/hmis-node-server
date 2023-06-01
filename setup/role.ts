import mongoose from 'mongoose'

import { resourceTypes } from 'data/resource'
import { toSentenceCase } from 'helpers/strings'
import { RoleModel } from 'models/role'

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

export const migrateRoles = async (devId: string) => {
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
