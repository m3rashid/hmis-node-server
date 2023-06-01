import type { Request, Response } from 'express'

import { resourceTypes } from 'data/resource'

export const getAllResourceTypes = async (req: Request, res: Response) => {
	return res.status(200).json(resourceTypes)
}
