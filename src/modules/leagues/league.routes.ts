import { Router } from "express";
import { LeagueController } from "./league.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middlewares";

const routes = Router();
const controller = new LeagueController();

routes.use(authMiddleware);

routes.post("/", controller.create);
routes.post("/join", controller.join);

export const leagueRoutes = routes;
