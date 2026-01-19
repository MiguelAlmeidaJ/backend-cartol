import { Request, Response } from "express";
import { MatchesService } from "./matches.service.js";

const service = new MatchesService();

export class MatchesController {
    async create(req: Request, res: Response) {
        const match = await service.create(req.body);

        return res.status(201).json(match);
    }

    async findAll(req: Request, res: Response) {
        const matches = await service.findAll();

        return res.json(matches);
    }

    async findById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const match = await service.findById(id);

        return res.json(match);
    }

    async findByRound(req: Request<{ roundId: string }>, res: Response) {
        const { roundId } = req.params;

        const matches = await service.findByRound(roundId);

        return res.json(matches);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const match = await service.update(id, req.body);

        return res.json(match);
    }

    async delete(req: Request<{ id: string }>, res: Response)  {
        const { id } = req.params;

        await service.delete(id);

        return res.status(204).send();
    
    }
}