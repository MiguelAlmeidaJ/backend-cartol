import { Router } from "express";
import { RoundsController } from "./rounds.controller.js";

const routes = Router();
const controller = new RoundsController();

routes.post('/', controller.create);
routes.get('/', controller.findAll);
routes.get('/:id', controller.findById);
routes.put('/:id', controller.update);

// Ações especificas
routes.patch('/close/:id', controller.close);
routes.patch('/open/:id', controller.open);

export const roundsRoutes = routes;