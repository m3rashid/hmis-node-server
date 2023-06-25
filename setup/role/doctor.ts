import type { MODELS } from '@hmis/gatekeeper';

export const defaultDoctorPermissions: MODELS.IPermission = {
  ADDRESS: { READ: 'ALL' },
  APPOINTMENT: { READ: 'ALL', UPDATE: ['SELF'] },
  AVAILABILITY: {
    CREATE: 'INDEPENDENT',
    READ: 'ALL',
    UPDATE: ['SELF'],
    DELETE: ['SELF'],
  },
  CONSUMABLES: { READ: 'ALL', UPDATE: 'ALL' },
  LEAVE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  NON_CONSUMABLES: { READ: 'ALL', UPDATE: 'ALL' },
  PRESCRIPTION: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  PROFILE: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  ROLE: { READ: 'ALL' },
  USER: { READ: 'ALL', UPDATE: ['SELF'] },
  ATTENDANCE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
  ANNOUNCEMENT: { READ: 'ALL' },
  PAYMENT: { READ: 'ALL' },
  OPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  IPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
  TESTS: { CREATE: 'ALL', READ: 'ALL', UPDATE: 'ALL' },
  CONFIG: { READ: 'ALL' },
};
