import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import List from '../../default/list';
import type { MODELS } from '@hmis/gatekeeper';

export const signupPatientInit = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupPatientStepTwo = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const signupPatientFinalize = async (req: Request, res: Response) => {
  console.log('Hello');
  res.status(200).json('Hello');
};

export const getAllExternalUsers = List<MODELS.IUser>(UserModel, {})

