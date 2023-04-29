import type { Request, Response } from 'express'
import ConsumableModel from 'models/consumable'
import NonConsumableModel from 'models/nonConsumables'

export const getAllConsumables = async (req: Request, res: Response) => {
	const consumables = await ConsumableModel.find({ deleted: false })
	return res.json(consumables)
}

export const getAllRemovedConsumables = async (req: Request, res: Response) => {
	const consumables = await ConsumableModel.find({ deleted: true })
	return res.json(consumables)
}

export const getAllNonConsumables = async (req: Request, res: Response) => {
	const consumables = await NonConsumableModel.find({ deleted: false })
	return res.json(consumables)
}

export const getAllRemovedNonConsumables = async (req: Request, res: Response) => {
	const consumables = await NonConsumableModel.find({ deleted: true })
	return res.json(consumables)
}
