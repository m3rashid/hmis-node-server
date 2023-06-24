import { Router } from 'express';
import resourceRouter from './controllers/resource';
import { appConfig } from './data/config';
import authRouter from './controllers/auth';
import userRouter from './controllers/authUser';
import patientRouter from './controllers/authPatient';
import consumableRouter from './controllers/consumable';
import nonConsumableRouter from './controllers/nonConsumable';
import notificationRouter from './controllers/notification';
import profileRouter from './controllers/profile';
import roleRouter from './controllers/role';
import addressRouter from './controllers/address';
import appointmentRouter from './controllers/appointment';
import availabilityRouter from './controllers/availability';
import leaveRouter from './controllers/leave';
import ipdRouter from './controllers/ipd';
import opdRouter from './controllers/opd';
import paymentRouter from './controllers/payment';
import prescriptionRouter from './controllers/prescription';
import testRouter from './controllers/test';
import searchRouter from './controllers/search';

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
router.use('/notification', notificationRouter);
router.use('/availability', availabilityRouter);
router.use('/prescription', prescriptionRouter);
router.use('/non-consumable', nonConsumableRouter);

export default router;
