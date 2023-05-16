import type { Request, Response } from 'express'
import { Router } from 'express'

import { appConfig } from 'modules/config/data'
import { useRoute } from 'utils/errors'

const configRouter = Router()

configRouter.get(
	'/',
	useRoute((req: Request, res: Response) => {
		res.status(200).json(appConfig)
	})
)

export default configRouter
