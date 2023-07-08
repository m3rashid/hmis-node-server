import { Router } from 'express';
import List from '../../default/list';
import Edit from '../../default/edit';
import Create from '../../default/create';
import Delete from '../../default/delete';
import { TeamModel } from '../models/team';
import type { MODELS } from '@hmis/gatekeeper';
import { checkAuth } from '../../../middlewares/auth';

const teamRouter: Router = Router();

teamRouter.post('/all', checkAuth, List<MODELS.ITeam>(TeamModel, {}));

teamRouter.post('/add', checkAuth, Create<MODELS.ITeam>(TeamModel, {}));

teamRouter.post('/edit', checkAuth, Edit<MODELS.ITeam>(TeamModel, {}));

teamRouter.post('/remove', checkAuth, Delete<MODELS.ITeam>(TeamModel, {}));

export default teamRouter;
