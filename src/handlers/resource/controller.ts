import type { Request, Response } from 'express'
import type { AddResourceBody, EditResourceBody } from 'handlers/resource/validator'
import ResourceModel from 'models/resource'

export const createResource = async (req: Request<any, any, AddResourceBody>, res: Response) => {
	const { name, description, type } = req.body
	const resource = new ResourceModel({
		actualName: name.toUpperCase(),
		displayName: name,
		description,
		type // validate type also
	})
	const savedRes = await resource.save()
	return res.json(savedRes)
}

export const getAllResource = async (req: Request, res: Response) => {
	const resources = await ResourceModel.find()
	return res.json(resources)
}

export const editResource = async (req: Request<any, any, EditResourceBody>, res: Response) => {
	const { name, description, type, resourceId } = req.body
	const resource = await ResourceModel.findByIdAndUpdate(
		resourceId,
		{ displayName: name, description, type },
		{ new: true }
	)
	return res.json(resource)
}
