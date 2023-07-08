import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import type { MODELS } from '@hmis/gatekeeper';
import { ProjectModel } from '../models/project';
import { checkAuth } from '../../../middlewares/auth';

const projectRouter: Router = Router();

projectRouter.post('/all', checkAuth, List<MODELS.IProject>(ProjectModel, {}));

projectRouter.post('/add', checkAuth, Create<MODELS.IProject>(ProjectModel, {}));

projectRouter.post('/edit', checkAuth, Edit<MODELS.IProject>(ProjectModel, {}));

projectRouter.post('/remove', checkAuth, Delete<MODELS.IProject>(ProjectModel, {}));

export default projectRouter;
