import { Request, Response } from "express";
import { FantasyScoreService } from "./fantasyScore.service";

const service = new FantasyScoreService();

type Params = {
  roundId: string;
};

export class FantasyScoreController {
  async calculate(
    req: Request<Params>,
    res: Response
  ) {
    const { roundId } = req.params;

    const result =
      await service.calculateRound(roundId);

    return res.json(result);
  }

  async ranking(
    req: Request<Params>,
    res: Response
  ) {
    const { roundId } = req.params;

    const ranking =
      await service.rankingByRound(roundId);

    return res.json(ranking);
  }
}
