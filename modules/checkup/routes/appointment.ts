import {
  addAppointment,
  getAllAppointments,
  getAppointmentDetails,
  updateAppointment,
} from '../controllers/appointment';
import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, appointmentValidator } from '@hmis/gatekeeper';

const appointmentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

appointmentRouter.post(
  '/add',
  checkAuth,
  Validator.validate(appointmentValidator.createAppointmentSchema),
  useRoute(addAppointment)
);
appointmentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(appointmentValidator.updateAppointmentSchema),
  useRoute(updateAppointment)
);
appointmentRouter.post('/details', checkAuth, useRoute(getAppointmentDetails));
appointmentRouter.post('/all', checkAuth, useRoute(getAllAppointments));

export default appointmentRouter;
