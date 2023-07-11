import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Delete from '../default/delete';
import Create from '../default/create';
import { TaskModel } from './models/task';
import type { MODELS } from '@hmis/gatekeeper';
import { SubTaskModel } from './models/subTask';
import { checkAuth } from '../../middlewares/auth';

const taskManagementRouter = Router();

taskManagementRouter.post(
  '/task/all',
  checkAuth,
  List<MODELS.ITask>(TaskModel, {})
);

taskManagementRouter.post(
  '/task/add',
  checkAuth,
  Create<MODELS.ITask>(TaskModel, {})
);

taskManagementRouter.post(
  '/task/edit',
  checkAuth,
  Edit<MODELS.ITask>(TaskModel, {})
);

taskManagementRouter.post(
  '/task/remove',
  checkAuth,
  Delete<MODELS.ITask>(TaskModel, {})
);

taskManagementRouter.post(
  '/task/recover',
  checkAuth,
  Delete<MODELS.ITask>(TaskModel, { recover: true })
);

taskManagementRouter.post(
  '/sub-task/all',
  checkAuth,
  List<MODELS.ISubTask>(SubTaskModel, {})
);

taskManagementRouter.post(
  '/sub-task/add',
  checkAuth,
  Create<MODELS.ISubTask>(SubTaskModel, {})
);

taskManagementRouter.post(
  '/sub-task/edit',
  checkAuth,
  Edit<MODELS.ISubTask>(SubTaskModel, {})
);

taskManagementRouter.post(
  '/sub-task/remove',
  checkAuth,
  Delete<MODELS.ISubTask>(SubTaskModel, {})
);

taskManagementRouter.post(
  '/sub-task/recover',
  checkAuth,
  Delete<MODELS.ISubTask>(SubTaskModel, { recover: true })
);

export default taskManagementRouter;
