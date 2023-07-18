import { Router } from 'express';
import { appConfig } from './data/config';
import ipdRouter from './modules/ipd/router';
import opdRouter from './modules/opd/router';
import miscRouter from './modules/misc/router';
import roleRouter from './modules/role/router';
import userRouter from './modules/user/router';
import uploadRouter from './modules/upload/router';
import checkupRouter from './modules/checkup/router';
import dashboardRouter from './modules/dashboard/router';
import inventoryRouter from './modules/inventory/router';
import taskManagementRouter from './modules/taskManagement/router';

const router: Router = Router();

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/config', (req, res) => res.json(appConfig));
router.use('/ipd', ipdRouter);
router.use('/opd', opdRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/misc', miscRouter);
router.use('/checkup', checkupRouter);
router.use('/inventory', inventoryRouter);
router.use('/dashboard', dashboardRouter);
router.use('/task', taskManagementRouter);
router.use('/upload', uploadRouter);

export default router;
