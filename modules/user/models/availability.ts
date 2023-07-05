import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, ENUMS, paginatedCompiledModel } from '@hmis/gatekeeper';

const availabilitySchema = new mongoose.Schema<MODELS.IAvailability>(
  {
    ...baseModelSchema,
    day: { type: String, required: true, enum: ENUMS.DAYS },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
  },
  { timestamps: true }
);

export const AvailabilityModel = paginatedCompiledModel<MODELS.IAvailability>(
  modelNames.availability,
  availabilitySchema
);
