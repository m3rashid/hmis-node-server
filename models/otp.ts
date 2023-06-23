import type { MODELS } from '@hmis/gatekeeper';
import { modelNames } from '@hmis/gatekeeper';
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema<MODELS.IOtp>({
  otp: { type: String, required: true },
  email: { type: String, required: true, unique: true },
	expiry: { type: String, required: true },
});

export const OtpModel = mongoose.model<MODELS.Document<MODELS.IOtp>>(
  modelNames.otp,
  otpSchema
);
