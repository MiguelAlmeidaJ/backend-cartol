import { Router } from "express";
import { LeagueController } from "./league.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middlewares.js";

const routes = Router();
const controller = new LeagueController();

routes.use(authMiddleware);

routes.post("/", controller.create);
routes.post("/join", controller.join);

export const leagueRoutes = routes;
