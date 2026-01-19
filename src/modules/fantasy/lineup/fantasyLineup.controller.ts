import { Request, Response } from "express";
import { FantasyLineupService } from "./fantasyLineup.service.js";

const service = new FantasyLineupService();

type CreateParams = {
  fantasyTeamId: string;
  userId: string;
};

type ShowParams = {
  fantasyTeamId: string;
  roundId: string;
};

export class FantasyLineupController {
    async create(req: Request<CreateParams>, res: Response) {
        const { fantasyTeamId } = req.params;
        const userId = req.user.id;
        const lineup = await service.create(fantasyTeamId, userId, req.body);
        return res.status(201).json(lineup);
    }

    async show(req: Request<ShowParams>, res: Response) {
        const { fantasyTeamId, roundId } = req.params;
        const lineup = await service.show(fantasyTeamId, roundId);
        return res.json(lineup);
    }
}