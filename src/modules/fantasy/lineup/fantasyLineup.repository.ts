import { prisma } from "../../../config/prisma";

interface CreateFantasyLineupRepositoryInput {
  fantasyTeamId: string;
  roundId: string;
  playersIds: string[];
  captainId: string;
  formation: {
    GOLEIRO: number;
    ZAGUEIRO: number;
    LATERAL: number;
    MEIA: number;
    ATACANTE: number;
  };
}

export class FantasyLineupRepository {
    create(data: CreateFantasyLineupRepositoryInput) {
        return prisma.fantasyLineup.create({
            data: {
                fantasyTeamId: data.fantasyTeamId,
                roundId: data.roundId,
                captainId: data.captainId,
                formation: data.formation,
                players: {
                    create: data.playersIds.map(playerId => ({
                        playerId
                    }))
                },
            },
            include: {
                players: true,
            },
        });
    }

    findByTeamAndRound(fantasyTeamId: string, roundId: string) {
        return prisma.fantasyLineup.findFirst({
            where: {
                fantasyTeamId,
                roundId
            },
            include: {
                players: {
                    include: {
                        player: true,
                    },
                },
                captain: true,
            },
        });
    }

    findExisting(fantasyTeamId: string, roundId: string) {
        return prisma.fantasyLineup.findFirst({
            where: {
                fantasyTeamId,
                roundId
            },
        });
    }

    findTeamByUser(fantasyTeamId: string, userId: string) {
        return prisma.fantasyTeam.findFirst({
            where: {
                id: fantasyTeamId,
                userId,
            },
        });
    }

    findPlayersByIds(playerIds: string[]) {
        return prisma.player.findMany({
            where: {
                id: { in: playerIds },
                active: true,
            },
        });
    }

    findRoundById(roundId: string) {
        return prisma.round.findUnique({
            where: { id: roundId },
        });
    }

}