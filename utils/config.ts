import type { CorsOptions } from 'cors';

export const config = {
  appName: 'HMIS',
  appFullName: 'Hospital Management Information System',
  appVersion: '1.0.0',
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'HEAD'],
    optionsSuccessStatus: 200,
  } as CorsOptions,
};
