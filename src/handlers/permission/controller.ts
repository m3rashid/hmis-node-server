import type { Request, Response } from 'express'
import PermissionModel from 'models/permission'

export const getAllPermissions = async (req: Request, res: Response) => {
	const permissions = await PermissionModel.find()
	return res.json(permissions)
}
