import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const uploadSchema = new mongoose.Schema<MODELS.IUpload>(
  {
    ...baseModelSchema,
    url: { type: String, required: true },
		name: { type: String, required: true },
    format: { type: String, required: true },
  },
  { timestamps: true }
);

export const UploadModel = paginatedCompiledModel<MODELS.IUpload>(
  modelNames.upload,
  uploadSchema
);
