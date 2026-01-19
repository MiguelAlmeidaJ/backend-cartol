import { Router } from "express";
import { PlayersController } from "./players.controller";

const routes = Router();
const controller = new PlayersController();

routes.post('/', controller.create);
routes.get('/', controller.findAll);
routes.get('/:id', controller.findById);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export const playersRoutes = routes;