import { Router } from 'express'

import {
	getAllConsumables,
	getAllNonConsumables,
	getAllRemovedConsumables,
	getAllRemovedNonConsumables
} from 'modules/inventory/controller'
import { useRoute } from 'utils/errors'

const inventoryRouter = Router()

inventoryRouter.get('/consumable/all', useRoute(getAllConsumables))
inventoryRouter.get('/consumable/removed', useRoute(getAllRemovedConsumables))
inventoryRouter.get('/non-consumable/all', useRoute(getAllNonConsumables))
inventoryRouter.get('/non-consumable/removed', useRoute(getAllRemovedNonConsumables))

export default inventoryRouter
