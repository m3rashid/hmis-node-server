import { UserModel } from '../models/user';
import type { Request, Response } from 'express';
import type { PaginatedRequestQueryParams } from '../../../helpers/types';

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

export const getAllExternalUsersWithDeleted = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const users = await UserModel.paginate(
    { origin: 'EXTERNAL' },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};

export const getAllExternalUsers = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  const users = await UserModel.paginate(
    {
      deleted: false,
      origin: 'EXTERNAL',
    },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.json(users);
};
