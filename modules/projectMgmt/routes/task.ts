import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import { TaskModel } from '../models/task';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';

const taskRouter: Router = Router();

taskRouter.post('/all', checkAuth, List<MODELS.ITask>(TaskModel, {}));

taskRouter.post('/add', checkAuth, Create<MODELS.ITask>(TaskModel, {}));

taskRouter.post('/edit', checkAuth, Edit<MODELS.ITask>(TaskModel, {}));

taskRouter.post('/remove', checkAuth, Delete<MODELS.ITask>(TaskModel, {}));

export default taskRouter;
