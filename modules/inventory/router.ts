import { Router } from 'express'

import { List } from 'modules/default/controllers'
import { ConsumableModel } from 'modules/inventory/models/consumable'
import { NonConsumableModel } from 'modules/inventory/models/nonConsumables'

const inventoryRouter = Router()

inventoryRouter.get(
	'/consumable/all',
	List<'consumable'>(ConsumableModel, {
		skipValidator: true,
		queryTransformer: async () => ({ deleted: false })
	})
)

inventoryRouter.get(
	'/consumable/removed',
	List<'consumable'>(ConsumableModel, {
		skipValidator: true,
		queryTransformer: async () => ({ deleted: true })
	})
)

inventoryRouter.get(
	'/non-consumable/all',
	List<'nonConsumable'>(NonConsumableModel, {
		skipValidator: true,
		queryTransformer: async () => ({ deleted: false })
	})
)

inventoryRouter.get(
	'/non-consumable/removed',
	List<'nonConsumable'>(NonConsumableModel, {
		skipValidator: true,
		queryTransformer: async () => ({ deleted: true })
	})
)

export default inventoryRouter
