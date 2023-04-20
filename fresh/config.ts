import type { IConfig } from 'models/config'
import ConfigModel from 'models/config'

const defaultConfig = {
	colors: {
		primary: '#00BDC1',
		secondary: '#484C56',
		lightFg: '#F9F9F9',
		lightBg: '#F1F1F1',
		darkFg: '#484C56',
		darkBg: '#484C56',
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9'
	},
	sidebarStringMap: {
		home: 'Home',
		about: 'About',
		contact: 'Contact',
		learn: 'Learn',
		'learn-home': 'Home',
		'learn-modules': 'Modules'
	},
	otherStringMap: {
		login: 'Login',
		register: 'Register',
		logout: 'Logout'
	}
}

const migrateConfig = async () => {
	const configs = Object.entries(defaultConfig).reduce<IConfig[]>(
		(acc, [containerName, innerConfig]) => {
			const c = Object.entries(innerConfig).map(([name, value]) => ({
				name,
				value,
				containerName
			}))
			return [...acc, ...c]
		},
		[]
	)
	await ConfigModel.insertMany(configs)
}

export default migrateConfig
