import { Router, type Request, type Response } from 'express';

import { resourceTypes } from '../data/resource';
import { ERRORS } from '@hmis/gatekeeper';
import { checkAuth } from '../middlewares/auth';

export const getAllResourceTypes = async (req: Request, res: Response) => {
  return res.status(200).json(resourceTypes);
};

const resourceRouter: Router = Router()
const useRoute = ERRORS.useRoute

resourceRouter.get('/all', checkAuth, useRoute(getAllResourceTypes));

export default resourceRouter
