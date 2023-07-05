import mongoose from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from '../../../utils/models';
import { modelNames, paginatedCompiledModel } from '@hmis/gatekeeper';

const addressSchema = new mongoose.Schema<MODELS.IAddress>(
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

export const AddressModel = paginatedCompiledModel<MODELS.IAddress>(
  modelNames.address,
  addressSchema
);
