import mongoose from 'mongoose';
import { Router } from 'express';
import List from '../default/list';
import { UploadModel } from './model';
import { ERRORS } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import generateUploadUrl from '../../utils/upload';
import { checkAuth } from '../../middlewares/auth';
import Create from '../default/create';

const uploadRouter = Router();
const useRoute = ERRORS.useRoute;

uploadRouter.post(
  '/',
  checkAuth,
  useRoute(async (req: Request, res: Response) => {
    const url = await generateUploadUrl();
    return res.status(200).json(url);
  })
);

uploadRouter.post('/all', checkAuth, List<MODELS.IUpload>(UploadModel, {}));

uploadRouter.post('/mine', checkAuth, List<MODELS.IUpload>(UploadModel, {
	filterQueryTransformer: async ({user}) =>  ({
		createdBy: new mongoose.Types.ObjectId(user._id)
	})
}));

uploadRouter.post('/add', checkAuth, Create<MODELS.IUpload>(UploadModel, {}));


export default uploadRouter;
