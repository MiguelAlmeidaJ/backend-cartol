import { AppError } from "../../shared/errors/AppError.js";
import { RankingRepository } from "./ranking.repository.js";

export class RankingService {
  private repository = new RankingRepository();

  async rankingByLeagueRound(
    leagueId: string,
    roundId: string
  ) {
    const members =
      await this.repository.rankingByLeagueRound(
        leagueId,
        roundId
      );

    if (!members.length) {
      throw new AppError("Liga não encontrada", 404);
    }

    return members
      .map(member => {
        const score =
          member.fantasyTeam.scores[0];

        return {
          fantasyTeamId: member.fantasyTeam.id,
          teamName: member.fantasyTeam.name,
          userName: member.fantasyTeam.user.name,
          points: score?.points ?? 0,
        };
      })
      .sort((a, b) => b.points - a.points);
  }

  async rankingByLeague(leagueId: string) {
    const members =
      await this.repository.rankingByLeague(
        leagueId
      );

    if (!members.length) {
      throw new AppError("Liga não encontrada", 404);
    }

    const ranking = members.map(member => {
      const totalPoints =
        member.fantasyTeam.scores.reduce(
          (sum, score) => sum + score.points,
          0
        );

      return {
        fantasyTeamId: member.fantasyTeam.id,
        teamName: member.fantasyTeam.name,
        userName: member.fantasyTeam.user.name,
        totalPoints,
      };
    });

    return ranking.sort(
      (a: { totalPoints: number; }, b: { totalPoints: number; }) => b.totalPoints - a.totalPoints
    );
  }

  async globalByRound(roundId: string) {}
}
