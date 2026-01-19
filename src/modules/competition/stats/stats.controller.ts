import { Request, Response } from "express";
import { StatsService } from "./stats.service.js";

const service = new StatsService();

export class StatsController {
    async create(req: Request, res: Response) {
        const stats = await service.create(req.body);
        return res.status(201).json(stats);
    }

    async findById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const stats = await service.findById(id);

        return res.json(stats);
    }

    async findByMatch(req: Request<{ matchId: string }>, res: Response) {
        const { matchId } = req.params;

        const stats = await service.findByMatch(matchId);

        return res.json(stats);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const stats = await service.update(id, req.body);

        return res.json(stats);
    }

}