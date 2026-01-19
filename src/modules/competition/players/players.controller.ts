import { Request, Response } from "express";
import { PlayersService } from "./players.service";

const service = new PlayersService();

export class PlayersController {
    async create(req: Request, res: Response) {
        const player = await service.create(req.body);

        return res.status(201).json(player);
    }

    async findAll(req: Request, res: Response) {
        const players = await service.findAll();

        return res.json(players);
    }

    async findById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const player = await service.findById(id);

        return res.json(player);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const player = await service.update(id, req.body);

        return res.json(player);
    }

    async delete(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        await service.delete(id);

        return res.status(204).send();
    }

}