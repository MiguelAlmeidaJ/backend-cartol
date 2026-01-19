import { prisma } from "../../config/prisma";

export class RankingRepository {
  rankingByLeagueRound(
    leagueId: string,
    roundId: string
  ) {
    return prisma.leagueMember.findMany({
      where: {
        leagueId,
      },
      include: {
        fantasyTeam: {
          include: {
            user: true,
            scores: {
              where: { roundId },
            },
          },
        },
      },
    });
  }

  rankingByLeague(leagueId: string) {
    return prisma.leagueMember.findMany({
      where: { leagueId },
      include: {
        fantasyTeam: {
          include: {
            user: true,
            scores: true,
          },
        },
      },
    });
  }
}
