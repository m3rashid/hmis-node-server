import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import type { MODELS } from '@hmis/gatekeeper';
import { SubTaskModel } from '../models/subTask';
import { checkAuth } from '../../../middlewares/auth';

const subTaskRouter: Router = Router();

subTaskRouter.post('/all', checkAuth, List<MODELS.ISubTask>(SubTaskModel, {}));

subTaskRouter.post(
  '/add',
  checkAuth,
  Create<MODELS.ISubTask>(SubTaskModel, {})
);

subTaskRouter.post('/edit', checkAuth, Edit<MODELS.ISubTask>(SubTaskModel, {}));

subTaskRouter.post(
  '/remove',
  checkAuth,
  Delete<MODELS.ISubTask>(SubTaskModel, {})
);

export default subTaskRouter;
