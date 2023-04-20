import ResourceModel from 'models/resource'

const resources = [
	{
		name: 'User',
		description: 'Auth users in the domain',
		type: 'user'
	},
	{
		name: 'Profile',
		description: 'Profile of users in the domain',
		type: 'profile'
	},
	{
		name: 'Address',
		description: 'Addresses of users in the domain',
		type: 'address'
	},
	{
		name: 'Permission',
		description: 'Permissions of the users in the domain',
		type: 'permission'
	},
	{
		name: 'Role',
		description: 'Roles of the users in the domain',
		type: 'role'
	},
	{
		name: 'Availability',
		description: 'Availability of the users in the domain',
		type: 'availability'
	},
	{
		name: 'Leave',
		description: 'Leave applications by the users',
		type: 'leave'
	},
	{
		name: 'Appointment',
		description: 'Appointment of two users of different roles',
		type: 'appointment'
	},
	{
		name: 'Consumables',
		description: 'All the items consumed by a patient or the hospital',
		type: 'consumables'
	},
	{
		name: 'Non Consumables',
		description: 'All the items used by the hospital which do not get depleted on use',
		type: 'non_consumables'
	},
	{
		name: 'Prescription',
		description: 'All the prescriptions created by the hospital authority',
		type: 'prescription'
	},
	{
		name: 'Config',
		description: 'App Configuration constants deciding the functionality for the entire app',
		type: 'config'
	}
]

const migrateResources = async () => {
	const promises: Array<Promise<any>> = []
	resources.forEach(resource => {
		const r = new ResourceModel(resource)
		promises.push(r.save())
	})

	await Promise.all(promises)
}

export default migrateResources
