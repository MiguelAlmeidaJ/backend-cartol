import { Router } from "express";
import { RealTeamController } from "./realTeam.controller";

const router = Router();
const controller = new RealTeamController();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.findById);

export const realTeamRoutes = router;