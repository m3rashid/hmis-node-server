import type { Request, Response } from 'express'

import { resourceTypes } from 'modules/resources/data'

export const getAllResourceTypes = async (req: Request, res: Response) => {
	return res.status(200).json(resourceTypes)
}
