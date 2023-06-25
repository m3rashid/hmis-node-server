import mongoose from 'mongoose';
import { TestModel } from '../models/test';

export const createTests = async (devId: string) => {
  const promises: Array<Promise<any>> = [];
  for (let i = 0; i < 10; i++) {
    // TODO: create sensible test names
		const newTest = new TestModel({
      name: '',
      description: '',
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    promises.push(newTest.save());
  }
  const tests = await Promise.all(promises);
  return tests;
};
