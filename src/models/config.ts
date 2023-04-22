import mongoose from 'mongoose'
import { modelNames } from 'models/base'

export interface IConfig {
	name: string
	value: any
	containerName: string
}

const configSchema = new mongoose.Schema<IConfig>({
	name: { type: String, required: true, unique: true },
	containerName: { type: String, required: true, unique: true },
	value: { type: String, required: true }
})

const ConfigModel = mongoose.model<IConfig>(modelNames.config, configSchema)
export default ConfigModel
