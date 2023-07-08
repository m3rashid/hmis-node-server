import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';
import { TaskStatusModel } from '../models/taskStatus';

const taskStatusRouter: Router = Router();

taskStatusRouter.post(
  '/all',
  checkAuth,
  List<MODELS.ITaskStatus>(TaskStatusModel, {})
);

taskStatusRouter.post(
  '/add',
  checkAuth,
  Create<MODELS.ITaskStatus>(TaskStatusModel, {})
);

taskStatusRouter.post(
  '/edit',
  checkAuth,
  Edit<MODELS.ITaskStatus>(TaskStatusModel, {})
);

taskStatusRouter.post(
  '/remove',
  checkAuth,
  Delete<MODELS.ITaskStatus>(TaskStatusModel, {})
);

export default taskStatusRouter;
