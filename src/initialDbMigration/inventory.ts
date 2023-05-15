import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'

import { dummyMedicines, dummyOtherAssets } from 'initialDbMigration/dummy/inventory'
import ConsumableModel from 'modules/inventory/models/consumable'
import type { IConsumable } from 'modules/inventory/models/consumable'
import NonConsumableModel from 'modules/inventory/models/nonConsumables'
import type { INonConsumable } from 'modules/inventory/models/nonConsumables'

type InventoryArr<T> = Array<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>

const fakeConsumables = (count: number, devId: string) => {
	const medicines = Array.from(new Set(dummyMedicines))
	const consumablesArray: InventoryArr<IConsumable> = []
	for (let i = 0; i < count; i++) {
		consumablesArray.push({
			name: medicines[i],
			quantityLeft: faker.datatype.number({ min: 1, max: 1000 }),
			quantityPerUnit: faker.datatype.number({ min: 1, max: 30 }),
			batchNumber: faker.datatype.uuid(),
			expiryDate: faker.date.future(),
			manufacturer: faker.company.bs(),
			deleted: faker.datatype.boolean(),
			lastOrderDate: faker.date.past(),
			nextOrderDate: faker.date.future(),
			createdBy: new mongoose.Types.ObjectId(devId) as any,
			lastUpdatedBy: new mongoose.Types.ObjectId(devId) as any
		})
	}
	return consumablesArray
}

const fakeNonConsumables = (count: number, devId: string) => {
	const nonMedicines = Array.from(new Set(dummyOtherAssets))
	const nonConsumablesArray: InventoryArr<INonConsumable> = []
	for (let i = 0; i < count; i++) {
		nonConsumablesArray.push({
			name: nonMedicines[i],
			quantityLeft: faker.datatype.number({ min: 1, max: 1000 }),
			lastServicingDate: faker.date.past(),
			nextServicingDate: faker.date.future(),
			deleted: faker.datatype.boolean(),
			createdBy: new mongoose.Types.ObjectId(devId) as any,
			lastUpdatedBy: new mongoose.Types.ObjectId(devId) as any
		})
	}
	return nonConsumablesArray
}

const migrateInventory = async (devId: string) => {
	const promises: Array<Promise<any>> = []
	fakeConsumables(60, devId).forEach(c => {
		const p = new ConsumableModel(c)
		promises.push(p.save())
	})

	fakeNonConsumables(60, devId).forEach(c => {
		const p = new NonConsumableModel(c)
		promises.push(p.save())
	})
	await Promise.all(promises)
}

export default migrateInventory
