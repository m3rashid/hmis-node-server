import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Delete from '../default/delete';
import Create from '../default/create';
import { TaskModel } from './models/task';
import type { MODELS } from '@hmis/gatekeeper';
import { SubTaskModel } from './models/subTask';
import { checkAuth } from '../../middlewares/auth';
import { TaskStatusModel } from './models/taskStatus';

const projectManagementRouter = Router();

projectManagementRouter.post(
  '/task-status/all',
  checkAuth,
  List<MODELS.ITaskStatus>(TaskStatusModel, {})
);

projectManagementRouter.post(
  '/task-status/add',
  checkAuth,
  Create<MODELS.ITaskStatus>(TaskStatusModel, {})
);

projectManagementRouter.post(
  '/task-status/edit',
  checkAuth,
  Edit<MODELS.ITaskStatus>(TaskStatusModel, {})
);

projectManagementRouter.post(
  '/task-status/remove',
  checkAuth,
  Delete<MODELS.ITaskStatus>(TaskStatusModel, {})
);

projectManagementRouter.post(
  '/task-status/recover',
  checkAuth,
  Delete<MODELS.ITaskStatus>(TaskStatusModel, { recover: true })
);

projectManagementRouter.post(
  '/task/all',
  checkAuth,
  List<MODELS.ITask>(TaskModel, {})
);

projectManagementRouter.post(
  '/task/add',
  checkAuth,
  Create<MODELS.ITask>(TaskModel, {})
);

projectManagementRouter.post(
  '/task/edit',
  checkAuth,
  Edit<MODELS.ITask>(TaskModel, {})
);

projectManagementRouter.post(
  '/task/remove',
  checkAuth,
  Delete<MODELS.ITask>(TaskModel, {})
);

projectManagementRouter.post(
  '/task/recover',
  checkAuth,
  Delete<MODELS.ITask>(TaskModel, { recover: true })
);

projectManagementRouter.post(
  '/sub-task/all',
  checkAuth,
  List<MODELS.ISubTask>(SubTaskModel, {})
);

projectManagementRouter.post(
  '/sub-task/add',
  checkAuth,
  Create<MODELS.ISubTask>(SubTaskModel, {})
);

projectManagementRouter.post(
  '/sub-task/edit',
  checkAuth,
  Edit<MODELS.ISubTask>(SubTaskModel, {})
);

projectManagementRouter.post(
  '/sub-task/remove',
  checkAuth,
  Delete<MODELS.ISubTask>(SubTaskModel, {})
);

projectManagementRouter.post(
  '/sub-task/recover',
  checkAuth,
  Delete<MODELS.ISubTask>(SubTaskModel, { recover: true })
);

export default projectManagementRouter;
