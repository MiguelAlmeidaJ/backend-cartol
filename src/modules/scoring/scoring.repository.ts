import { prisma } from "../../config/prisma.js";

export class ScoringRepository {
  findRoundById(roundId: string) {
    return prisma.round.findUnique({
      where: { id: roundId },
    });
  }

  findLineupsByRound(roundId: string) {
    return prisma.fantasyLineup.findMany({
      where: { roundId },
      include: {
        players: {
          include: {
            player: {
              include: {
                stats: {
                  where: {
                    match: {
                      roundId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  createFantasyScores(data: {
    fantasyTeamId: string;
    roundId: string;
    points: number;
  }[]) {
    return prisma.fantasyScore.createMany({ data });
  }

  markRoundAsProcessed(roundId: string) {
    return prisma.round.update({
      where: { id: roundId },
      data: { isProcessed: true },
    });
  }
}
