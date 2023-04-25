import type { Request, Response } from 'express'
import UserModel from 'models/user'

export const createProfile = async (req: Request, res: Response) => {}

export const updateProfile = async (req: Request, res: Response) => {}

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await UserModel.find({ deleted: false }).populate('roles')
	return res.json(users)
}

export const getAllUsersWithDeleted = async (req: Request, res: Response) => {
	const users = await UserModel.find().populate('roles')
	return res.json(users)
}
