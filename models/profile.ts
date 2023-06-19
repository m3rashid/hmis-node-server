import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { ENUMS, modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';
import { baseModelSchema } from './index';

const profileSchema = new mongoose.Schema<MODELS.IProfile>(
  {
    ...baseModelSchema,
    bio: { type: String },
    roomNumber: { type: String },
    age: { type: Number },
    sex: { type: String, required: true, enum: ENUMS.SEX },
    phone: { type: String },
    phoneVerified: { type: Boolean, default: false },
    maritalStatus: { type: String, enum: ENUMS.MARITAL_STATUS },
    profilePicture: { type: String },
    addresses: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.address },
    ],
    bloodGroup: { type: String, enum: ENUMS.BLOOD_GROUPS },
    origin: { type: String },
    lastVisit: { type: Date },
    designation: { type: String },
    department: { type: String },
    userHealthId: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
    leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.leave }],
    availabilities: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.availability },
    ],
    appointmentsAsDoctor: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment },
    ],
    appointmentsAsPatient: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment },
    ],
    appointmentsAsReferredBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: modelNames.appointment },
    ],
  },
  { timestamps: true }
);

profileSchema.plugin(paginate);

export const ProfileModel = mongoose.model<
  MODELS.Document<MODELS.IProfile>,
  MODELS.PaginateModel<MODELS.IProfile>
>(modelNames.profile, profileSchema);
