import { Router } from 'express';

import {
  currentUser,
  currentUserAllDetails,
  forgotPassword,
  getAllUsers,
  getAllUsersWithDeleted,
  login,
  logout,
  resetPassword,
  revalidateToken,
  signupPatientFinalize,
  signupPatientInit,
  signupPatientStepTwo,
  signupUser,
  updatePassword,
} from './controllers/auth';
import {
  addConsumable,
  addNonConsumable,
  editConsumable,
  editNonConsumable,
  getAllConsumables,
  getAllConsumablesDeleted,
  getAllNonConsumables,
  getAllNonConsumablesDeleted,
  removeConsumable,
  removeNonConsumable,
} from './controllers/inventory';
import { getNotifications } from './controllers/notification';
import { createProfile, updateProfile } from './controllers/profile';
import { getAllResourceTypes } from './controllers/resource';
import {
  createRole,
  deleteRole,
  editRole,
  getRoleDetails,
  getRoleWithDeleted,
  getRoles,
} from './controllers/role';
import { appConfig } from './data/config';
import { checkAuth } from './middlewares/auth';
import { Validator, ERRORS, authValidator } from '@hmis/gatekeeper';

const router: Router = Router();

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return res.status(200).send(healthCheck);
  } catch (error: any) {
    healthCheck.message = error;
    return res.status(503).send(healthCheck);
  }
});
router.get('/config', (req, res) => res.json(appConfig));

router.post(
  '/auth/login',
  Validator.validate(authValidator.loginSchema),
  ERRORS.useRoute(login)
);
router.post('/auth/logout', ERRORS.useRoute(logout));
router.post('/auth/revalidate', ERRORS.useRoute(revalidateToken));
router.get('/auth/user/all', ERRORS.useRoute(getAllUsers));
router.get(
  '/auth/user/all-with-deleted',
  ERRORS.useRoute(getAllUsersWithDeleted)
);
router.post('/auth/user/me', checkAuth, ERRORS.useRoute(currentUser));
router.post(
  '/auth/user/me-details',
  checkAuth,
  ERRORS.useRoute(currentUserAllDetails)
);
router.post('/auth/user/forgot-password', ERRORS.useRoute(forgotPassword));
router.post('/auth/user/reset-password', ERRORS.useRoute(resetPassword));
router.post('/auth/patient/signup-init', ERRORS.useRoute(signupPatientInit));
router.post('/auth/patient/signup-two', ERRORS.useRoute(signupPatientStepTwo));
router.post(
  '/auth/patient/signup-final',
  ERRORS.useRoute(signupPatientFinalize)
);
router.post('/auth/user/signup', ERRORS.useRoute(signupUser));
router.post('/auth/user/update-password', ERRORS.useRoute(updatePassword));

router.post('/role/create', checkAuth, ERRORS.useRoute(createRole));
router.post('/role/delete', checkAuth, ERRORS.useRoute(deleteRole));
router.post('/role/edit', checkAuth, ERRORS.useRoute(editRole));
router.get('/role/all', checkAuth, ERRORS.useRoute(getRoles));
router.post('/role/details', checkAuth, ERRORS.useRoute(getRoleDetails));
router.get(
  '/roles/all-with-deleted',
  checkAuth,
  ERRORS.useRoute(getRoleWithDeleted)
);

router.get('/resource/all', checkAuth, ERRORS.useRoute(getAllResourceTypes));

router.post('/profile/create', checkAuth, ERRORS.useRoute(createProfile));
router.post('/profile/update', checkAuth, ERRORS.useRoute(updateProfile));

router.get('/notification/all', checkAuth, ERRORS.useRoute(getNotifications));

router.get(
  '/inventory/consumable/all',
  checkAuth,
  ERRORS.useRoute(getAllConsumables)
);
router.post(
  '/inventory/consumable/add',
  checkAuth,
  ERRORS.useRoute(addConsumable)
);
router.post(
  '/inventory/consumable/edit',
  checkAuth,
  ERRORS.useRoute(editConsumable)
);
router.post(
  '/inventory/consumable/remove',
  checkAuth,
  ERRORS.useRoute(removeConsumable)
);
router.get(
  '/inventory/consumable/removed',
  checkAuth,
  ERRORS.useRoute(getAllConsumablesDeleted)
);

router.get(
  '/inventory/non-consumable/all',
  checkAuth,
  ERRORS.useRoute(getAllNonConsumables)
);
router.post(
  '/inventory/non-consumable/add',
  checkAuth,
  ERRORS.useRoute(addNonConsumable)
);
router.post(
  '/inventory/non-consumable/edit',
  checkAuth,
  ERRORS.useRoute(editNonConsumable)
);
router.post(
  '/inventory/non-consumable/remove',
  checkAuth,
  ERRORS.useRoute(removeNonConsumable)
);
router.get(
  '/inventory/non-consumable/removed',
  checkAuth,
  ERRORS.useRoute(getAllNonConsumablesDeleted)
);

export default router;
