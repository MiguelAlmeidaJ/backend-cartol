import { Request, Response } from "express";
import { LeagueService } from "./league.service.js";

const service = new LeagueService();

export class LeagueController {
  async create(req: Request, res: Response) {
    const league = await service.create(req.body);
    return res.status(201).json(league);
  }

  async join(req: Request, res: Response) {
    const { fantasyTeamId } = req.body;

    const member = await service.join(
      fantasyTeamId,
      req.body.inviteCode
    );

    return res.status(201).json(member);
  }
}
