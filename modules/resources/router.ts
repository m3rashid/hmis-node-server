import { Router } from 'express'

import { getAllResourceTypes } from 'modules/resources/controller'
import { useRoute } from 'utils/errors'

const resourceRouter = Router()

resourceRouter.get('/all', useRoute(getAllResourceTypes))

export default resourceRouter
