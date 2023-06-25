import type { MODELS } from '@hmis/gatekeeper';

export const defaultPatientPermissions: MODELS.IPermission = {
  ADDRESS: { READ: 'ALL', CREATE: 'INDEPENDENT' },
  APPOINTMENT: { READ: ['SELF'] },
  AVAILABILITY: { READ: 'ALL' },
  CONSUMABLES: {},
  LEAVE: { READ: 'ALL' },
  NON_CONSUMABLES: {},
  PRESCRIPTION: { READ: ['SELF'] },
  PROFILE: { CREATE: 'INDEPENDENT', READ: ['SELF'], UPDATE: ['SELF'] },
  ROLE: { READ: ['SELF'] },
  USER: { READ: ['SELF'], UPDATE: ['SELF'] },
  ATTENDANCE: {},
  ANNOUNCEMENT: { READ: 'ALL' },
  PAYMENT: { READ: ['SELF'] },
  OPD: { READ: ['SELF'] },
  IPD: { READ: ['SELF'] },
  TESTS: { READ: ['SELF'] },
  CONFIG: { READ: 'ALL' },
};
