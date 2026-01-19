import { Request, Response } from "express";
import { RoundsService } from "./rounds.service.js";

const service = new RoundsService();

export class RoundsController {
    async create(req: Request, res: Response) {
        const round = await service.create(req.body);

        return res.status(201).json(round);
    }

    async findAll(req: Request, res: Response) {
        const rounds = await service.findAll();

        return res.json(rounds);
    }

    async findById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const round = await service.findById(id);

        return res.json(round);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const round = await service.update(id, req.body);

        return res.json(round);
    }

    async close(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const round = await service.closeRound(id);

        return res.json(round);
    }

    async open(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const round = await service.openRound(id);

        return res.json(round);
    }

}