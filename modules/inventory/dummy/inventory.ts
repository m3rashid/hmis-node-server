import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import type { MODELS } from '@hmis/gatekeeper';
import { logger } from '../../../utils/logger';
import { ConsumableModel } from '../models/consumable';
import { NonConsumableModel } from '../models/nonConsumable';
import { dummyMedicines, dummyOtherAssets } from './data';

type InventoryArr<T> = Array<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>;

const fakeConsumables = (count: number, devId: string) => {
  const medicines = Array.from(new Set(dummyMedicines));
  const consumablesArray: InventoryArr<MODELS.IConsumable> = [];
  for (let i = 0; i < count; i++) {
    consumablesArray.push({
      name: medicines[i],
      quantityLeft: faker.number.int({ min: 1, max: 1000 }),
      quantityPerUnit: faker.number.int({ min: 1, max: 30 }),
      batchNumber: faker.string.uuid(),
      expiryDate: faker.date.future(),
      manufacturer: faker.company.buzzPhrase(),
      deleted: faker.datatype.boolean(),
      lastOrderDate: faker.date.past(),
      nextOrderDate: faker.date.future(),
      createdBy: new mongoose.Types.ObjectId(devId) as any,
    });
  }
  return consumablesArray;
};

const fakeNonConsumables = (count: number, devId: string) => {
  const nonMedicines = Array.from(new Set(dummyOtherAssets));
  const nonConsumablesArray: InventoryArr<MODELS.INonConsumable> = [];
  for (let i = 0; i < count; i++) {
    nonConsumablesArray.push({
      name: nonMedicines[i],
      quantityLeft: faker.number.int({ min: 1, max: 1000 }),
      lastServicingDate: faker.date.past(),
      nextServicingDate: faker.date.future(),
      deleted: faker.datatype.boolean(),
      createdBy: new mongoose.Types.ObjectId(devId) as any,
    });
  }
  return nonConsumablesArray;
};

export const migrateInventory = async (devId: string) => {
  const consumablesPromise: Array<Promise<any>> = [];
  fakeConsumables(60, devId).forEach((c) => {
    const p = new ConsumableModel(c);
    consumablesPromise.push(p.save());
  });
  const cons = await Promise.all(consumablesPromise);
  const consArr = cons.map((t) => t._id);

  const nonConsumablesPromise: Array<Promise<any>> = [];
  fakeNonConsumables(60, devId).forEach((c) => {
    const p = new NonConsumableModel(c);
    nonConsumablesPromise.push(p.save());
  });
  const nonCons = await Promise.all(nonConsumablesPromise);
  const nonConsArr = nonCons.map((t) => t._id);

  logger.info('Inventory Migrated');
  return { consumables: consArr, nonConsumables: nonConsArr };
};
