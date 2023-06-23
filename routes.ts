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

const useRoute = ERRORS.useRoute;

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
  useRoute(login)
);
router.post('/auth/logout', useRoute(logout));
router.post('/auth/revalidate', useRoute(revalidateToken));
router.get('/auth/user/all', useRoute(getAllUsers));
router.get('/auth/user/all-with-deleted', useRoute(getAllUsersWithDeleted));
router.post('/auth/user/me', checkAuth, useRoute(currentUser));
router.post(
  '/auth/user/me-details',
  checkAuth,
  useRoute(currentUserAllDetails)
);
router.post('/auth/user/forgot-password', useRoute(forgotPassword));
router.post('/auth/user/reset-password', useRoute(resetPassword));
router.post('/auth/patient/signup-init', useRoute(signupPatientInit));
router.post('/auth/patient/signup-two', useRoute(signupPatientStepTwo));
router.post('/auth/patient/signup-final', useRoute(signupPatientFinalize));
router.post('/auth/user/signup', useRoute(signupUser));
router.post('/auth/user/update-password', useRoute(updatePassword));

router.post('/role/create', checkAuth, useRoute(createRole));
router.post('/role/delete', checkAuth, useRoute(deleteRole));
router.post('/role/edit', checkAuth, useRoute(editRole));
router.get('/role/all', checkAuth, useRoute(getRoles));
router.post('/role/details', checkAuth, useRoute(getRoleDetails));
router.get('/roles/all-with-deleted', checkAuth, useRoute(getRoleWithDeleted));

router.get('/resource/all', checkAuth, useRoute(getAllResourceTypes));

router.post('/profile/create', checkAuth, useRoute(createProfile));
router.post('/profile/update', checkAuth, useRoute(updateProfile));

router.get('/notification/all', checkAuth, useRoute(getNotifications));

router.get('/consumable/all', checkAuth, useRoute(getAllConsumables));
router.post('/consumable/add', checkAuth, useRoute(addConsumable));
router.post('/consumable/edit', checkAuth, useRoute(editConsumable));
router.post(
  '/consumable/remove',
  checkAuth,
  useRoute(removeConsumable)
);
router.get(
  '/consumable/removed',
  checkAuth,
  useRoute(getAllConsumablesDeleted)
);

router.get(
  '/non-consumable/all',
  checkAuth,
  useRoute(getAllNonConsumables)
);
router.post(
  '/non-consumable/add',
  checkAuth,
  useRoute(addNonConsumable)
);
router.post(
  '/non-consumable/edit',
  checkAuth,
  useRoute(editNonConsumable)
);
router.post(
  '/non-consumable/remove',
  checkAuth,
  useRoute(removeNonConsumable)
);
router.get(
  '/non-consumable/removed',
  checkAuth,
  useRoute(getAllNonConsumablesDeleted)
);

export default router;
