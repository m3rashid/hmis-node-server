import type {
  Document,
  IAddress,
  PaginateModel,
} from '@hmis/gatekeeper/models';
import { modelNames } from '@hmis/gatekeeper/models';
import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { baseModelSchema } from './index';

const addressSchema = new mongoose.Schema<IAddress>(
  {
    ...baseModelSchema,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, default: 'India' },
    roomNumber: { type: String },
    buildingNumber: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.profile,
      required: true,
    },
  },
  { timestamps: true }
);

addressSchema.plugin(paginate);

export const AddressModel = mongoose.model<
  Document<IAddress>,
  PaginateModel<IAddress>
>(modelNames.address, addressSchema);
