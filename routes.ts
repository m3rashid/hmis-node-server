import { Router } from 'express';
import { appConfig } from './data/config';
import ipdRouter from './modules/ipd/router';
import opdRouter from './modules/opd/router';
import miscRouter from './modules/misc/router';
import roleRouter from './modules/role/router';
import userRouter from './modules/user/router';
import checkupRouter from './modules/checkup/router';
import inventoryRouter from './modules/inventory/router';
import projectManagementRouter from './modules/projectMgmt/router';

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
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/misc', miscRouter);
router.use('/checkup', checkupRouter)
router.use('/inventory', inventoryRouter);
router.use('/project', projectManagementRouter);

export default router;
