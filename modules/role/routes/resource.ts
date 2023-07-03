import { Router } from "express";
import { ERRORS } from "@hmis/gatekeeper";
import { checkAuth } from "../../../middlewares/auth";
import { getAllResourceTypes } from "../controllers/resource";

const resourceRouter: Router = Router();
const useRoute = ERRORS.useRoute;

resourceRouter.get('/all', checkAuth, useRoute(getAllResourceTypes));

export default resourceRouter;
