import bcrypt from 'bcrypt'
import UserModel from 'models/user'
import RoleModel from 'models/role'

const defaultUsers = [
	{
		name: 'HMIS App',
		email: 'coold1741@gmail.com',
		password: process.env.DEV_PASSWORD,
		role: 'DEVELOPER'
	},
	{
		name: 'MD Rashid Hussain',
		email: 'm3rashid.hussain@gmail.com',
		password: process.env.ADMIN_PASSWORD,
		role: 'SUPER_ADMIN'
	}
]

const createUsers = async (user: (typeof defaultUsers)[number]) => {
	const pwd = await bcrypt.hash(user.password, 12)
	const roles = await RoleModel.find({ actualName: user.role }).select({ _id: 1 })

	const newUser = new UserModel({
		name: user.name,
		email: user.email,
		password: pwd,
		roles: roles.map(t => t._id)
	})
	return await newUser.save()
}

const migrateUsers = async () => {
	const promises: Array<Promise<any>> = []
	defaultUsers.forEach(user => {
		promises.push(createUsers(user))
	})
	await Promise.all(promises)
}

export default migrateUsers
