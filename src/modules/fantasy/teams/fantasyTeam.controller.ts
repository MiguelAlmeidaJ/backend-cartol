import { Request, Response } from "express";
import { FantasyTeamService } from "./fantasyTeam.service";

const service = new FantasyTeamService();

export class FantasyTeamController {
  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const team = await service.create(userId, req.body.name);
    return res.status(201).json(team);
  }

  async myTeams(req: Request, res: Response) {
    const userId = req.user.id;
    const teams = await service.findByUser(userId);
    return res.json(teams);
  }

  async findById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const { id } = req.params;
    const team = await service.findById(id);
    return res.json(team);
  }

  async update(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const { id } = req.params;
    const team = await service.update(id, req.body.name);
    return res.json(team);
  }
}
