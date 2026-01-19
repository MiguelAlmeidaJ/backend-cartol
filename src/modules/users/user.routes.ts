import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middlewares.js";

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get('/me', controller.profile);
router.put('/me', controller.update);

export const userRoutes = router;