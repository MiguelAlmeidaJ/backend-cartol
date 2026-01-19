import { prisma } from "../../../config/prisma.js";

export class FantasyScoreRepository {
    create(data: {
        fantasyTeamId: string;
        roundId: string;
        points: number;
    }) {
        return prisma.fantasyScore.create({ data })
    }

    findByTeamAndRound(fantasyTeamId: string, roundId: string) {
        return prisma.fantasyScore.findUnique({
            where: {
                fantasyTeamId_roundId: {
                    fantasyTeamId,
                    roundId
                },
            },
        });
    }

    findByRound(roundId: string) {
        return prisma.fantasyScore.findMany({
            where: { roundId },
            include: {
                fantasyTeam: true,
            },
            orderBy: {
                points: 'desc',
            },
        });
    }
}