import { Router } from 'express';
import List from '../default/list';
import Edit from '../default/edit';
import Delete from '../default/delete';
import Create from '../default/create';
import { GoalModel } from './models/goal';
import { TeamModel } from './models/team';
import { TaskModel } from './models/task';
import type { MODELS } from '@hmis/gatekeeper';
import { ProjectModel } from './models/project';
import { SubTaskModel } from './models/subTask';
import { checkAuth } from '../../middlewares/auth';
import { TaskStatusModel } from './models/taskStatus';

const projectManagementRouter = Router();

projectManagementRouter.post(
  '/goal/all',
  checkAuth,
  List<MODELS.IGoal>(GoalModel, {})
);

projectManagementRouter.post(
  '/goal/add',
  checkAuth,
  Create<MODELS.IGoal>(GoalModel, {})
);

projectManagementRouter.post(
  '/goal/edit',
  checkAuth,
  Edit<MODELS.IGoal>(GoalModel, {})
);

projectManagementRouter.post(
  '/goal/remove',
  checkAuth,
  Delete<MODELS.IGoal>(GoalModel, {})
);

projectManagementRouter.post(
  '/team/all',
  checkAuth,
  List<MODELS.ITeam>(TeamModel, {})
);

projectManagementRouter.post(
  '/team/add',
  checkAuth,
  Create<MODELS.ITeam>(TeamModel, {})
);

projectManagementRouter.post(
  '/team/edit',
  checkAuth,
  Edit<MODELS.ITeam>(TeamModel, {})
);

projectManagementRouter.post(
  '/team/remove',
  checkAuth,
  Delete<MODELS.ITeam>(TeamModel, {})
);

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
  '/project/all',
  checkAuth,
  List<MODELS.IProject>(ProjectModel, {})
);

projectManagementRouter.post(
  '/project/add',
  checkAuth,
  Create<MODELS.IProject>(ProjectModel, {})
);

projectManagementRouter.post(
  '/project/edit',
  checkAuth,
  Edit<MODELS.IProject>(ProjectModel, {})
);

projectManagementRouter.post(
  '/project/remove',
  checkAuth,
  Delete<MODELS.IProject>(ProjectModel, {})
);

export default projectManagementRouter;
