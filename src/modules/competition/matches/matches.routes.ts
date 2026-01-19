import { Router } from "express";
import { MatchesController } from "./matches.controller.js";

const routes = Router();
const controller = new MatchesController();

routes.post('/', controller.create);
routes.get('/', controller.findAll);
routes.get('/:id', controller.findById);
routes.get('/round/:roundId', controller.findByRound);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export const matchesRoutes = routes;