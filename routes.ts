import { Router } from 'express';
import { appConfig } from './data/config';
import ipdRouter from './modules/ipd/routes/ipd';
import opdRouter from './modules/opd/routes/opd';
import authRouter from './modules/user/routes/auth';
import roleRouter from './modules/role/routes/role';
import leaveRouter from './modules/misc/routes/leave';
import testRouter from './modules/checkup/routes/test';
import userRouter from './modules/user/routes/authUser';
import searchRouter from './modules/user/routes/search';
import addressRouter from './modules/user/routes/address';
import profileRouter from './modules/user/routes/profile';
import paymentRouter from './modules/misc/routes/payment';
import resourceRouter from './modules/role/routes/resource';
import patientRouter from './modules/user/routes/authPatient';
import announcementRouter from './modules/misc/routes/announcement';
import availabilityRouter from './modules/user/routes/availability';
import consumableRouter from './modules/inventory/routes/consumable';
import appointmentRouter from './modules/checkup/routes/appointment';
import prescriptionRouter from './modules/checkup/routes/prescription';
import nonConsumableRouter from './modules/inventory/routes/nonConsumable';

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

router.use('/ipd', ipdRouter);
router.use('/opd', opdRouter);
router.use('/lab', testRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/leave', leaveRouter);
router.use('/search', searchRouter);
router.use('/patient', patientRouter);
router.use('/address', addressRouter);
router.use('/profile', profileRouter);
router.use('/payment', paymentRouter);
router.use('/resource', resourceRouter);
router.use('/consumable', consumableRouter);
router.use('/appointment', appointmentRouter);
router.use('/announcement', announcementRouter);
router.use('/availability', availabilityRouter);
router.use('/prescription', prescriptionRouter);
router.use('/non-consumable', nonConsumableRouter);

export default router;
