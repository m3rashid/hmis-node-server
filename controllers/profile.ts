import type { Request, Response } from 'express'

export const createProfile = async (req: Request, res: Response) => {
	console.log('Hello')
	res.status(200).json('Hello')
}

export const updateProfile = async (req: Request, res: Response) => {
	console.log('Hello')
	res.status(200).json('Hello')
}
