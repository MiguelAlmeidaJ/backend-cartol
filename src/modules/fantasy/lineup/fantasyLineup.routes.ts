import { Router } from "express";
import { FantasyLineupController } from "./fantasyLineup.controller";
import { authMiddleware } from "../../../shared/middlewares/auth.middlewares";

const routes = Router();
const controller = new FantasyLineupController();

routes.use(authMiddleware);

routes.post('/:fantasyTeamId', controller.create);
routes.get('/:fantasyTeamId/:roundId', controller.show);

export const fantasyLineupRoutes = routes;