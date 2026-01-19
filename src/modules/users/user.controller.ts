import { Request, Response } from "express";
import { UserService } from "./user.service.js";

const userService = new UserService();

export class UserController {
    async profile(req: Request, res: Response) {
        const userId = req.user!.id;

        const user = await userService.getProfile(userId);

        return res.json(user);
    }

    async update(req: Request, res: Response) {
        const userId = req.user!.id;
        const { name, email } = req.body;

        const user = await userService.updateProfile(userId, {
            name,
            email,
        });

        return res.json(user);
    }
}