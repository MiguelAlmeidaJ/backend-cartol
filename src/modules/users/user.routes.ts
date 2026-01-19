import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middlewares";

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get('/me', controller.profile);
router.put('/me', controller.update);

export const userRoutes = router;