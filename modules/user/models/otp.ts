import mongoose from 'mongoose';
import { modelNames } from '@hmis/gatekeeper';
import type { MODELS } from '@hmis/gatekeeper';

const otpSchema = new mongoose.Schema<MODELS.IOtp>({
  otp: { type: String, required: true },
  email: { type: String, required: true, unique: true },
	expiry: { type: Date, required: true },
});

export const OtpModel = mongoose.model<MODELS.Document<MODELS.IOtp>>(
  modelNames.otp,
  otpSchema
);
