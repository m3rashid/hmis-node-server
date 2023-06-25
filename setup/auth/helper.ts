const DEV_PASSWORD = "dev123"
const ADMIN_PASSWORD = "admin123"
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
  {
    name: 'Doctor',
    email: 'doc@hmis.com',
    password: DOCTOR_PASSWORD,
    role: 'DOCTOR',
    isDoctor: true,
  },
  {
    name: 'Receptionist',
    email: 'rec@hmis.com',
    password: RECEPTIONIST_PASSWORD,
    role: 'RECEPTIONIST',
    isDoctor: false,
  },
];
