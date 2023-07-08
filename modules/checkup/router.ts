import {
  ERRORS,
  Validator,
  testValidator,
  appointmentValidator,
  prescriptionValidator,
} from '@hmis/gatekeeper';
import { Router } from 'express';
import Edit from '../default/edit';
import List from '../default/list';
import Create from '../default/create';
import type { Response } from 'express';
import { TestModel } from './models/test';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../middlewares/auth';
import { AppointmentModel } from './models/appointment';
import { PrescriptionModel } from './models/prescription';
import type { RequestWithBody } from '../../helpers/types';

const checkupRouter = Router();
const useRoute = ERRORS.useRoute;

checkupRouter.post(
  '/test/add',
  checkAuth,
  Validator.validate(testValidator.addTestSchema),
  Create<MODELS.ITest>(TestModel, {})
);

checkupRouter.post(
  '/test/edit',
  checkAuth,
  Validator.validate(testValidator.updateTestSchema),
  Edit<MODELS.ITest>(TestModel, {})
);

checkupRouter.post('/test/all', checkAuth, List<MODELS.ITest>(TestModel, {}));

checkupRouter.post(
  '/test/details',
  checkAuth,
  Validator.validate(testValidator.deleteTestSchema),
  useRoute(
    async (
      req: RequestWithBody<testValidator.DeleteTestSchemaBody>,
      res: Response
    ) => {
      const testDetails = await TestModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(testDetails);
    }
  )
);

checkupRouter.post(
  '/prescription/add',
  checkAuth,
  Validator.validate(prescriptionValidator.createPrescriptionSchema),
  Create<MODELS.IPrescription>(PrescriptionModel, {})
);

checkupRouter.post(
  '/prescription/edit',
  checkAuth,
  Validator.validate(prescriptionValidator.updatePrescriptionSchema),
  Edit<MODELS.IPrescription>(PrescriptionModel, {})
);

checkupRouter.get(
  '/prescription',
  checkAuth,
  List<MODELS.IPrescription>(PrescriptionModel, {})
);

checkupRouter.post(
  '/prescription/details',
  checkAuth,
  Validator.validate(prescriptionValidator.deletePrescriptionSchema),
  useRoute(
    async (
      req: RequestWithBody<prescriptionValidator.DeletePrescriptionBody>,
      res: Response
    ) => {
      const prescriptionDetails = await PrescriptionModel.aggregate([
        { $match: { _id: req.body._id } },
      ]);
      return res.status(200).json(prescriptionDetails);
    }
  )
);

checkupRouter.post(
  '/appointment/add',
  checkAuth,
  Validator.validate(appointmentValidator.createAppointmentSchema),
  Create<MODELS.IAppointment>(AppointmentModel, {})
);

checkupRouter.post(
  '/appointment/edit',
  checkAuth,
  Validator.validate(appointmentValidator.updateAppointmentSchema),
  Edit<MODELS.IAppointment>(AppointmentModel, {})
);

checkupRouter.post(
  '/appointment/all',
  checkAuth,
  List<MODELS.IAppointment>(AppointmentModel, {})
);

checkupRouter.post(
  '/appointment/details',
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

export default checkupRouter;
