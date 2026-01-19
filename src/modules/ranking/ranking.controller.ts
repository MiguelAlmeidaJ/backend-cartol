import { Request, Response } from "express";
import { RankingService } from "./ranking.service";

const service = new RankingService();

export class RankingController {
  async byLeagueRound(
    req: Request<{ leagueId: string; roundId: string }>,
    res: Response
  ) {
    const { leagueId, roundId } = req.params;

    const ranking =
      await service.rankingByLeagueRound(
        leagueId,
        roundId
      );

    return res.json(ranking);
  }

  async byLeague(
    req: Request<{ leagueId: string }>,
    res: Response
  ) {
    const { leagueId } = req.params;

    const ranking =
      await service.rankingByLeague(leagueId);

    return res.json(ranking);
  }
}
