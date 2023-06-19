import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import type {
  Document,
  PaginateModel,
  IAvailability,
} from '@hmis/gatekeeper/models';
import { modelNames, DAYS } from '@hmis/gatekeeper/models';
import { baseModelSchema } from './index';

const availabilitySchema = new mongoose.Schema<IAvailability>(
  {
    ...baseModelSchema,
    day: { type: String, required: true, enum: DAYS },
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
  Document<IAvailability>,
  PaginateModel<IAvailability>
>(modelNames.availability, availabilitySchema);
