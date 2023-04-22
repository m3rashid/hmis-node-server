import ConfigModel from 'models/config'
import type { NextFunction, Request, Response } from 'express'

export const getConfig = async (req: Request, res: Response, next: NextFunction) => {
	const config = await ConfigModel.find().lean()
	const configShape = config.reduce<Record<string, Record<string, string>>>((acc, curr) => {
		acc[curr.containerName] = { ...acc[curr.containerName], [curr.name]: curr.value }
		return acc
	}, {})

	return res.status(200).json(configShape)
}

export const addConfig = async (req: Request, res: Response, next: NextFunction) => {}

export const editConfig = async (req: Request, res: Response, next: NextFunction) => {}
