import { Router } from 'express'

import { getConfig } from 'modules/config/controller'
import { useRoute } from 'utils/errors'

const configRouter = Router()

configRouter.get('/', useRoute(getConfig))

export default configRouter
