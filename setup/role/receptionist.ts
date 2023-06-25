import type { MODELS } from '@hmis/gatekeeper';

export const defaultReceptionistPermissions: MODELS.IPermission =
  {
    ADDRESS: { READ: 'ALL' },
    APPOINTMENT: {
      CREATE: 'INDEPENDENT',
      READ: 'ALL',
      UPDATE: 'ALL',
      DELETE: 'ALL',
    },
    AVAILABILITY: { READ: 'ALL' },
    CONSUMABLES: { READ: 'ALL' },
    LEAVE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
    NON_CONSUMABLES: { READ: 'ALL' },
    PRESCRIPTION: { READ: 'ALL' },
    PROFILE: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL' },
    ROLE: { READ: 'ALL' },
    USER: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: ['SELF'] },
    ATTENDANCE: { CREATE: 'INDEPENDENT', READ: 'ALL' },
    ANNOUNCEMENT: { CREATE: 'INDEPENDENT', READ: 'ALL' },
    PAYMENT: { CREATE: 'INDEPENDENT', READ: 'ALL' },
    OPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL', DELETE: 'ALL' },
    IPD: { CREATE: 'INDEPENDENT', READ: 'ALL', UPDATE: 'ALL', DELETE: 'ALL' },
    TESTS: { CREATE: 'ALL', READ: 'ALL', UPDATE: 'ALL' },
    CONFIG: { READ: 'ALL' },
  };
