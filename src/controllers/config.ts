import ConfigModel from 'models/config'
import type { NextFunction, Request, Response } from 'express'

export const getConfig = async (req: Request, res: Response, next: NextFunction) => {
	const config = await ConfigModel.find()
	res.status(200).json(config)
}

export const addConfig = async (req: Request, res: Response, next: NextFunction) => {}

export const editConfig = async (req: Request, res: Response, next: NextFunction) => {}
