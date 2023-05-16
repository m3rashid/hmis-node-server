import type { Request, Response } from 'express'

import { appConfig } from 'modules/config/data'

export const getConfig = async (req: Request, res: Response) => {
	return res.status(200).json(appConfig)
}
