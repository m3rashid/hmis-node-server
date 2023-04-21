import type { IConfig } from 'models/config'
import ConfigModel from 'models/config'

const defaultConfig = {
	app: {
		name: 'HMIS',
		version: '1.0.0',
		fullName: 'Health Management and Informatics System'
	},
	appColors: {
		primary: '#00BDC1',
		primaryHover: '#E6FFFB',
		secondary: '#484C56'
	},
	colors: {
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9'
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
