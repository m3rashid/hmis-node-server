import type { Request, Response } from 'express'

import { ConsumableModel } from 'models/consumable'
import { NonConsumableModel } from 'models/nonConsumables'

export const getAllConsumables = async (req: Request, res: Response) => {
	const consumables = await ConsumableModel.find({ deleted: false }).lean()
	res.status(200).json(consumables)
}

export const getAllNonConsumables = async (req: Request, res: Response) => {
	const nonConsumables = await NonConsumableModel.find({ deleted: false }).lean()
	res.status(200).json(nonConsumables)
}

export const getAllConsumablesDeleted = async (req: Request, res: Response) => {
	const consumables = await ConsumableModel.find({ deleted: true }).lean()
	res.status(200).json(consumables)
}

export const getAllNonConsumablesDeleted = async (req: Request, res: Response) => {
	const nonConsumables = await NonConsumableModel.find({ deleted: false }).lean()
	res.status(200).json(nonConsumables)
}
