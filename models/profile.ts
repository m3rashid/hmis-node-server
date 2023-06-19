import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { baseModelSchema, modelNames as models } from 'models';
import type { Document, IBaseModel, PaginateModel } from 'models';
import type { IAddress } from 'models/address';
import type { IAppointment } from 'models/appointment';
import type { IAvailability } from 'models/availability';
import type { ILeave } from 'models/leave';
import type { IUser } from 'models/user';

export const SEX = ['M', 'F', 'O'] as const;

export const MARITAL_STATUS = ['S', 'M', 'D', 'W'] as const; // Single, Married, Divorced, Widowed

export const BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

export interface IProfile extends IBaseModel {
  bio?: string;
  roomNumber?: string;
  age?: number;
  sex: string;
  phone?: string;
  phoneVerified: boolean;
  maritalStatus?: string;
  profilePicture?: string;
  addresses?: IAddress[];
  bloodGroup?: string;
  origin?: string;
  lastVisit?: Date;
  designation?: string;
  department?: string;
  userHealthId?: string;
  user: IUser;
  leaves: ILeave[];
  availabilities: IAvailability[];
  appointmentsAsDoctor: IAppointment[];
  appointmentsAsPatient: IAppointment[];
  appointmentsAsReferredBy: IAppointment[];
}

const profileSchema = new mongoose.Schema<IProfile>(
  {
    ...baseModelSchema,
    bio: { type: String },
    roomNumber: { type: String },
    age: { type: Number },
    sex: { type: String, required: true, enum: SEX },
    phone: { type: String },
    phoneVerified: { type: Boolean, default: false },
    maritalStatus: { type: String, enum: MARITAL_STATUS },
    profilePicture: { type: String },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: models.address }],
    bloodGroup: { type: String, enum: BLOOD_GROUPS },
    origin: { type: String },
    lastVisit: { type: Date },
    designation: { type: String },
    department: { type: String },
    userHealthId: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: models.leave }],
    availabilities: [
      { type: mongoose.Schema.Types.ObjectId, ref: models.availability },
    ],
    appointmentsAsDoctor: [
      { type: mongoose.Schema.Types.ObjectId, ref: models.appointment },
    ],
    appointmentsAsPatient: [
      { type: mongoose.Schema.Types.ObjectId, ref: models.appointment },
    ],
    appointmentsAsReferredBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: models.appointment },
    ],
  },
  { timestamps: true }
);

profileSchema.plugin(paginate);

export const ProfileModel = mongoose.model<
  Document<IProfile>,
  PaginateModel<IProfile>
>(models.profile, profileSchema);
