import mongoose from 'mongoose'
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

const migrateConfig = async (devId: string) => {
	const promises: Array<Promise<any>> = []

	Object.entries(defaultConfig).forEach(([containerName, innerConfig]) => {
		Object.entries(innerConfig).forEach(([name, value]) => {
			const p = new ConfigModel({
				name,
				value,
				containerName,
				createdBy: new mongoose.Types.ObjectId(devId),
				lastUpdatedBy: new mongoose.Types.ObjectId(devId)
			})
			promises.push(p.save())
		})
	})

	await Promise.all(promises)
}

export default migrateConfig
