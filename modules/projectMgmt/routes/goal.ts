import { Router } from "express";
import List from "../../default/list";
import Edit from "../../default/edit";
import Delete from "../../default/delete";
import Create from "../../default/create";
import { GoalModel } from "../models/goal";
import type { MODELS } from "@hmis/gatekeeper";
import { checkAuth } from "../../../middlewares/auth";

const goalRouter: Router = Router();

goalRouter.post('/all', checkAuth, List<MODELS.IGoal>(GoalModel, {}))

goalRouter.post('/add', checkAuth, Create<MODELS.IGoal>(GoalModel, {}))

goalRouter.post('/edit', checkAuth, Edit<MODELS.IGoal>(GoalModel, {}));

goalRouter.post('/remove', checkAuth, Delete<MODELS.IGoal>(GoalModel, {}));

export default goalRouter
