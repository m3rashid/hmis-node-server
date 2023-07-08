import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import type { Response } from 'express';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { AppointmentModel } from '../models/appointment';
import type { RequestWithBody } from '../../../helpers/types';
import { ERRORS, Validator, appointmentValidator } from '@hmis/gatekeeper';

const appointmentRouter: Router = Router();
const useRoute = ERRORS.useRoute;

appointmentRouter.post(
  '/add',
  checkAuth,
  Validator.validate(appointmentValidator.createAppointmentSchema),
  Create<MODELS.IAppointment>(AppointmentModel, {})
);

appointmentRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(appointmentValidator.updateAppointmentSchema),
  Edit<MODELS.IAppointment>(AppointmentModel, {})
);

appointmentRouter.post(
  '/all',
  checkAuth,
  List<MODELS.IAppointment>(AppointmentModel, {})
);

appointmentRouter.post(
  '/details',
  checkAuth,
  useRoute(
    async (
      req: RequestWithBody<appointmentValidator.DeleteAppointmentBody>,
      res: Response
    ) => {
      const appointment = await AppointmentModel.aggregate([
        { $match: { _id: req.body._id } },
        {
          $lookup: {
            from: 'doctor',
            localField: 'doctor',
            foreignField: '_id',
            as: 'doctor',
          },
        },
        {
          $lookup: {
            from: 'profile',
            localField: 'doctor.profile',
            foreignField: '_id',
            as: 'doctor.profile',
          },
        },
        {
          $lookup: {
            from: 'patient',
            localField: 'patient',
            foreignField: '_id',
            as: 'patient',
          },
        },
        {
          $lookup: {
            from: 'profile',
            localField: 'patient.profile',
            foreignField: '_id',
            as: 'patient.profile',
          },
        },
        {
          $lookup: {
            from: 'payment',
            localField: 'payment',
            foreignField: '_id',
            as: 'payment',
          },
        },
      ]);
      return res.status(200).json(appointment);
    }
  )
);

export default appointmentRouter;
