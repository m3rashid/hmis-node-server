import ConfigModel from 'models/config'
import type { Request, Response } from 'express'
import type { AddConfigBody, EditConfigBody } from './validator'

export const getConfig = async (req: Request, res: Response) => {
	const config = await ConfigModel.find().lean()
	const configShape = config.reduce<Record<string, Record<string, string>>>((acc, curr) => {
		acc[curr.containerName] = { ...acc[curr.containerName], [curr.name]: curr.value }
		return acc
	}, {})

	return res.status(200).json(configShape)
}

export const addConfig = async (req: Request<any, any, AddConfigBody>, res: Response) => {
	const { containerName, name, value } = req.body
	const config = new ConfigModel({
		containerName,
		name,
		value
	})
	const savedConfig = await config.save()
	return res.json(savedConfig)
}

export const editConfig = async (req: Request<any, any, EditConfigBody>, res: Response) => {
	const { configId, containerName, name, value } = req.body
	const config = await ConfigModel.findByIdAndUpdate(
		configId,
		{ containerName, name, value },
		{ new: true }
	)
	return res.json(config)
}
