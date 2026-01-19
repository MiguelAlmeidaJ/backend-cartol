import { prisma } from "../../../config/prisma";
import { CreatePlayerMatchStatsDTO, UpdatePlayerMatchStatsDTO } from "./stats.dto";

export class StatsRepository {
    create(data: CreatePlayerMatchStatsDTO) {
        return prisma.playerMatchStats.create({
            data,
            include: {
                player: true,
                match: {
                    include: {
                        round: true,
                    }
                }
            }
        });
    }

    findById(id: string) {
        return prisma.playerMatchStats.findUnique({
            where: { id },
            include: {
                player: true,
                match: {
                    include: {
                        round: true,
                    }
                }
            }
        });
    }

    findByPlayerAndMatch(playerId: string, matchId: string) {
        return prisma.playerMatchStats.findUnique({
            where: {
                playerId_matchId: {
                    playerId,
                    matchId,
                }
            },
        })
    }

    findByMatch(matchId: string) {
        return prisma.playerMatchStats.findMany({
            where: { matchId },
            include: { player: true }
        });
    }

    update(id: string, data: UpdatePlayerMatchStatsDTO) {
        return prisma.playerMatchStats.update({
            where: { id },
            data,
        });
    }
}