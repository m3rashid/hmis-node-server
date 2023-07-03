import {
  doctorsSearch,
  getDoctorAvailability,
  patientSearch,
} from '../controllers/search';
import { Router } from 'express';
import { ERRORS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';

const searchRouter: Router = Router();
const useRoute = ERRORS.useRoute;

searchRouter.post('/doctors', checkAuth, useRoute(doctorsSearch));
searchRouter.post('/patient', checkAuth, useRoute(patientSearch));
searchRouter.post(
  '/doctor-timings',
  checkAuth,
  useRoute(getDoctorAvailability)
);

export default searchRouter;
