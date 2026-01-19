import { Router } from "express";
import { FantasyScoreController } from "./fantasyScore.controller";
import { authMiddleware } from "../../../shared/middlewares/auth.middlewares";

const routes = Router();
const controller = new FantasyScoreController();

routes.use(authMiddleware);

routes.post(
  "/:roundId/calculate-scores",
  controller.calculate
);

routes.get(
  "/:roundId/ranking",
  controller.ranking
);

export const fantasyScoreRoutes = routes;
