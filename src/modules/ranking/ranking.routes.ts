import { Router } from "express";
import { RankingController } from "./ranking.controller.js";

const routes = Router();
const controller = new RankingController();

routes.get(
  "/:leagueId",
  controller.byLeague
);

routes.get(
  "/:leagueId/round/:roundId",
  controller.byLeagueRound
);

export const rankingRoutes = routes;
