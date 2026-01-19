import { Router } from "express";
import { StatsController } from "./stats.controller";

const routes = Router();
const controller = new StatsController();

routes.post('/', controller.create);
routes.get('/:id', controller.findById);
routes.get('/match/:matchId', controller.findByMatch);
routes.put('/:id', controller.update);

export const statsRoutes = routes;