import mongoose from 'mongoose'
import { baseModelSchema, modelNames } from 'models/base'
import type { IBaseModel } from 'models/base'
export interface IConfig extends IBaseModel {
	name: string
	value: any
	containerName: string
}

const configSchema = new mongoose.Schema<IConfig>(
	{
		...baseModelSchema,
		name: { type: String, required: true, unique: true },
		containerName: { type: String, required: true },
		value: { type: String, required: true }
	},
	{ timestamps: true }
)

const ConfigModel = mongoose.model<IConfig>(modelNames.config, configSchema)
export default ConfigModel
