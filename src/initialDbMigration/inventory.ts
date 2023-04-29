import { faker } from '@faker-js/faker'
import type { IConsumable } from 'models/consumable'
import type { INonConsumable } from 'models/nonConsumables'
import ConsumableModel, { CONSUMABLE_TYPE } from 'models/consumable'
import NonConsumableModel, { NON_CONSUMABLE_TYPE } from 'models/nonConsumables'
import { dummyMedicines, dummyOtherAssets } from 'initialDbMigration/dummy/inventory'

type ConsumableArray = Array<Partial<IConsumable>>
type NonConsumableArray = Array<Partial<INonConsumable>>

const fakeConsumables = (count: number, devId: string) => {
	const medicines = Array.from(new Set(dummyMedicines))
	const consumablesArray: ConsumableArray = []
	for (let i = 0; i < count; i++) {
		consumablesArray.push({
			name: medicines[i],
			type: faker.helpers.arrayElement(CONSUMABLE_TYPE),
			quantityLeft: faker.datatype.number({ min: 1, max: 1000 }),
			quantityPerUnit: faker.datatype.number({ min: 1, max: 30 }),
			batchNumber: faker.datatype.uuid(),
			expiryDate: faker.date.future(),
			manufacturer: faker.company.bs(),
			deleted: faker.datatype.boolean(),
			createdBy: devId as any,
			lastUpdatedBy: devId as any
		})
	}
	return consumablesArray
}

const fakeNonConsumables = (count: number, devId: string) => {
	const nonMedicines = Array.from(new Set(dummyOtherAssets))
	const nonConsumablesArray: NonConsumableArray = []
	for (let i = 0; i < count; i++) {
		nonConsumablesArray.push({
			name: nonMedicines[i],
			type: faker.helpers.arrayElement(NON_CONSUMABLE_TYPE),
			quantityLeft: faker.datatype.number({ min: 1, max: 1000 }),
			lastServicingDate: faker.date.past(),
			nextServicingDate: faker.date.future(),
			deleted: faker.datatype.boolean(),
			createdBy: devId as any,
			lastUpdatedBy: devId as any
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
