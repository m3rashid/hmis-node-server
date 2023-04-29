import mongoose from 'mongoose'
import ResourceModel from 'models/resource'
import { toSentenceCase } from 'utils/strings'

const resources = [
	{
		name: 'USER',
		description: 'Auth users in the domain',
		type: 'user'
	},
	{
		name: 'PROFILE',
		description: 'Profile of users in the domain',
		type: 'profile'
	},
	{
		name: 'ADDRESS',
		description: 'Addresses of users in the domain',
		type: 'address'
	},
	{
		name: 'Permission',
		description: 'Permissions of the users in the domain',
		type: 'permission'
	},
	{
		name: 'ROLE',
		description: 'Roles of the users in the domain',
		type: 'role'
	},
	{
		name: 'AVAILABILITY',
		description: 'Availability of the users in the domain',
		type: 'availability'
	},
	{
		name: 'LEAVE',
		description: 'Leave applications by the users',
		type: 'leave'
	},
	{
		name: 'APPOINTMENT',
		description: 'Appointment of two users of different roles',
		type: 'appointment'
	},
	{
		name: 'CONSUMABLES',
		description: 'All the items consumed by a patient or the hospital',
		type: 'consumables'
	},
	{
		name: 'NON_CONSUMABLES',
		description: 'All the items used by the hospital which do not get depleted on use',
		type: 'non_consumables'
	},
	{
		name: 'PRESCRIPTION',
		description: 'All the prescriptions created by the hospital authority',
		type: 'prescription'
	},
	{
		name: 'CONFIG',
		description: 'App Configuration constants deciding the functionality for the entire app',
		type: 'config'
	}
]

const migrateResources = async (devId: string) => {
	const promises: Array<Promise<any>> = []
	resources.forEach(resource => {
		const r = new ResourceModel({
			displayName: toSentenceCase(resource.name),
			actualName: resource.name,
			description: resource.description,
			type: resource.type,
			createdBy: new mongoose.Types.ObjectId(devId),
			lastUpdatedBy: new mongoose.Types.ObjectId(devId)
		})
		promises.push(r.save())
	})

	await Promise.all(promises)
}

export default migrateResources
