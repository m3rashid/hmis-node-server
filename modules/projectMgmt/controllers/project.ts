import type { Request, Response } from 'express';
import { ProjectModel } from '../models/project';

export const addProject = async (req: Request, res: Response) => {
	const project = await (new ProjectModel(req.body)).save();
	return res.status(200).json(project);
}

