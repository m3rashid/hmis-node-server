import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type { MODELS } from '@hmis/gatekeeper';
import { modelNames, ENUMS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const availabilitySchema = new mongoose.Schema<MODELS.IAvailability>(
  {
    ...baseModelSchema,
    day: { type: String, required: true, enum: ENUMS.DAYS },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.profile,
      required: true,
    },
  },
  { timestamps: true }
);

availabilitySchema.plugin(paginate);

export const AvailabilityModel = mongoose.model<
  MODELS.Document<MODELS.IAvailability>,
  MODELS.PaginateModel<MODELS.IAvailability>
>(modelNames.availability, availabilitySchema);
