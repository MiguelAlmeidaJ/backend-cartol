import { Router } from "express";
import { ScoringController } from "./scoring.controller";

const routes = Router();
const controller = new ScoringController();

routes.post("/process/:roundId", controller.processRound);

export const scoringRoutes = routes;