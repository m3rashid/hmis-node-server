import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const dashboardWidgetSchema = new mongoose.Schema<MODELS.IDashboardWidget>(
  {
    ...baseModelSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
    aggregation: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    kpiIndicator: { type: String },
    kpiValue: { type: String },
    modelName: { type: String, required: true },
    durationMonths: { type: Number, required: true },
    chartType: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  { timestamps: true }
);

export const DashboardWidgetModel =
  paginatedCompiledModel<MODELS.IDashboardWidget>(
    modelNames.dashboardWidget,
    dashboardWidgetSchema
  );
