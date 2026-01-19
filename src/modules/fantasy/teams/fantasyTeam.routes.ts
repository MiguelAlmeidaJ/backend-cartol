import { Router } from "express";
import { FantasyTeamController } from "./fantasyTeam.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middlewares.js";

const routes = Router();
const controller = new FantasyTeamController();

routes.use(authMiddleware);

routes.post('/', controller.create);
routes.get('/me', controller.myTeams);
routes.get('/:id', controller.findById);
routes.put('/:id', controller.update);

export const fantasyTeamRoutes = routes;