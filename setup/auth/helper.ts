import { faker } from '@faker-js/faker';

const DEV_PASSWORD = 'dev123';
const ADMIN_PASSWORD = 'admin123';
const DOCTOR_PASSWORD = 'doc123';
export const PATIENT_PASSWORD = 'pat123';
const RECEPTIONIST_PASSWORD = 'rec123';

export const devUser = {
  name: 'HMIS App',
  email: 'dev@hmis.com',
  password: DEV_PASSWORD,
  role: 'DEVELOPER',
  isDoctor: false,
};

export const otherUsers = [
  {
    name: 'Admin',
    email: 'admin@hmis.com',
    password: ADMIN_PASSWORD,
    role: 'SUPER_ADMIN',
    isDoctor: false,
  },
  ...Array(10)
    .fill(0)
    .map(() => {
      const name = faker.internet.displayName();
      return {
        name: faker.person.fullName(),
        email: faker.internet.exampleEmail({ firstName: name }),
        password: DOCTOR_PASSWORD,
        role: 'DOCTOR',
        isDoctor: true,
      };
    }),
  {
    name: 'Receptionist',
    email: 'rec@hmis.com',
    password: RECEPTIONIST_PASSWORD,
    role: 'RECEPTIONIST',
    isDoctor: false,
  },
];
