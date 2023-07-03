import mongoose from 'mongoose';
import { TestModel } from '../models/test';
import { faker } from '@faker-js/faker';
import type { MODELS } from '@hmis/gatekeeper';

const sampleTests = [
  {
    name: 'ANA (Antinuclear Antibody)',
    description:
      'This test is used to detect autoimmune diseases such as lupus and rheumatoid arthritis.',
  },
  {
    name: 'Amylase Test',
    description:
      'This test is used to diagnose pancreatitis and other pancreatic disorders.',
  },
  {
    name: 'Blood Sugar Test',
    description:
      'This test is used to diagnose diabetes and monitor blood sugar levels.',
  },
  {
    name: 'CT_Scans',
    description:
      'This test uses X-rays and computer technology to create detailed images of the body.',
  },
  {
    name: 'CBC (Complete Blood Count)',
    description:
      'This test measures the number of red blood cells, white blood cells, and platelets in the blood.',
  },
  {
    name: 'CRP (CReactive protein)',
    description: 'This test is used to detect inflammation in the body.',
  },
  {
    name: 'Hemoglobin A1C (HbA1c)',
    description:
      'This test is used to diagnose diabetes and monitor blood sugar levels over time.',
  },
  {
    name: 'MRI Scans',
    description:
      'This test uses magnetic fields and radio waves to create detailed images of the body.',
  },
  {
    name: 'Biopsy',
    description:
      'This test involves removing a small sample of tissue from the body for examination under a microscope.',
  },
  {
    name: 'Colonoscopy',
    description:
      'This test is used to screen for colon cancer and other conditions affecting the colon.',
  },
];

export const migrateTests = async (devId: string) => {
  const promises: Array<Promise<MODELS.ITest>> = [];
  for (let i = 0; i < sampleTests.length; i++) {
    const newTest = new TestModel({
      name: sampleTests[i].name,
      description: sampleTests[i].description,
      costINR: faker.number.int({ min: 100, max: 6000 }),
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    promises.push(newTest.save());
  }
  const tests = await Promise.all(promises);
  return tests.map(t => t._id)
};
