import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { AppointmentModel } from '../models/appointment';
import { getAppointmentDetails } from '../controllers/appointment';
import { ERRORS, Validator, appointmentValidator } from '@hmis/gatekeeper';

const appointmentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

appointmentRouter.post(
  '/add',
  checkAuth,
  Validator.validate(appointmentValidator.createAppointmentSchema),
  useRoute(Create<MODELS.IAppointment>(AppointmentModel, {}))
);

appointmentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(appointmentValidator.updateAppointmentSchema),
  useRoute(Edit<MODELS.IAppointment>(AppointmentModel, {}))
);

appointmentRouter.post('/details', checkAuth, useRoute(getAppointmentDetails));

appointmentRouter.post(
  '/all',
  checkAuth,
  useRoute(List<MODELS.IAppointment>(AppointmentModel, {}))
);

export default appointmentRouter;
