import mongoose from 'mongoose';
import { Router } from 'express';
import List from '../default/list';
import Delete from '../default/delete';
import Create from '../default/create';
import type { FilterQuery } from 'mongoose';
import type { Request, Response } from 'express';
import { checkAuth } from '../../middlewares/auth';
import { DashboardWidgetModel } from './models/widget';
import { ERRORS, modelNames, type MODELS } from '@hmis/gatekeeper';

const dashboardRouter = Router();
const useRoute = ERRORS.useRoute;

dashboardRouter.post(
  '/widget/all',
  checkAuth,
  List<MODELS.IDashboardWidget>(DashboardWidgetModel, {})
);

dashboardRouter.post(
  '/widget/add',
  checkAuth,
  // TODO: Add validation
  Create<MODELS.IDashboardWidget>(DashboardWidgetModel, {})
);

dashboardRouter.post(
  '/widget/remove',
  checkAuth,
  Delete<MODELS.IDashboardWidget>(DashboardWidgetModel, {})
);

dashboardRouter.post(
  '/widget/recover',
  checkAuth,
  Delete<MODELS.IDashboardWidget>(DashboardWidgetModel, { recover: true })
);

dashboardRouter.post(
  '/widget/get',
  checkAuth,
  useRoute(
    async (
      req: Request<any, any, { query: FilterQuery<any>; widgetId: string }>,
      res: Response
    ) => {
      const widget = await DashboardWidgetModel.findById(req.body.widgetId);
      if (!widget) throw ERRORS.newError('No widget found');

      const model = mongoose.model(modelNames[widget.modelName]);
      const data = await model.aggregate((widget.aggregation || []) as any);
      return res.status(200).json(data);
    }
  )
);

export default dashboardRouter;
