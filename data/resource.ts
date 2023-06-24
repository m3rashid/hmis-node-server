export interface IResource {
	name: string
	description: string
	availablePermissions: {
		independent: string[]
		actions: string[]
	}
}

export const resourceTypes: readonly IResource[] = [
  {
    name: 'ADDRESS',
    description: 'Addresses of users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'APPOINTMENT',
    description: 'Appointment of two users of different roles',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'AVAILABILITY',
    description: 'Availability of the users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'CONSUMABLES',
    description: 'All the items consumed by a patient or the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'LEAVE',
    description: 'Leave applications by the users',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'NON_CONSUMABLES',
    description:
      'All the items used by the hospital which do not get depleted on use',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'PRESCRIPTION',
    description: 'All the prescriptions created by the hospital authority',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'PROFILE',
    description: 'Profile of users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'ROLE',
    description: 'Roles of the users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'USER',
    description: 'Auth users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'ATTENDANCE',
    description: 'Attendance of the users in the domain',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'ANNOUNCEMENT',
    description: 'Announcements made in the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'PAYMENT',
    description: 'ALl Payments made in the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'OPD',
    description: 'Out Patient interactions made in the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'IPD',
    description: 'In Patient interactions made in the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'TESTS',
    description: 'All Tests interactions made in the hospital',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
  {
    name: 'CONFIG',
    description:
      'App Configuration constants deciding the functionality for the entire app',
    availablePermissions: {
      independent: ['CREATE'],
      actions: ['READ', 'UPDATE', 'DELETE'],
    },
  },
];
