import { Request, Response } from "express";
import { RealTeamService } from "./realTeam.service";

const service = new RealTeamService();

export class RealTeamController {
    async create(req: Request, res: Response) {
        const { name, shortName } = req.body;

        const realTeam = await service.create(name, shortName);

        return res.status(201).json(realTeam);
    }

    async list(req: Request, res: Response) {
        const realTeams = await service.list();

        return res.json(realTeams);
    }

    async findById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const realTeam = await service.findById(id);

        return res.json(realTeam);
    }
}