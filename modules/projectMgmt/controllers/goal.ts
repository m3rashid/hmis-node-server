import { GoalModel } from '../models/goal';
import type { Request, Response } from 'express';

export const addGoal = async (req: Request, res: Response) => {
  const goal = await new GoalModel(req.body).save();
  return res.status(200).json(goal);
};

export const updateGoal = async (req: Request, res: Response) => {
  const goal = await GoalModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  return res.status(200).json(goal);
};

export const deleteGoal = async (req: Request, res: Response) => {
  const goal = await GoalModel.findByIdAndUpdate(
    { _id: req.body._id },
    { isDeleted: true },
    { new: true }
  );
  return res.status(200).json(goal);
};
