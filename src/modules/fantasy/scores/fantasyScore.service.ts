import { prisma } from "../../../config/prisma.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { calculatePoints } from "../../../shared/utils/calculatePoints.js";
import { FantasyScoreRepository } from "./fantasyScore.repository.js";

export class FantasyScoreService {
    private repository = new FantasyScoreRepository();

    async calculateRound(roundId: string) {
        const round = await prisma.round.findUnique({
            where: { id: roundId },
        });

        if (!round) {
            throw new AppError("Rodada não encontrada", 404);
        }

        if (round.isOpen) {
            throw new AppError("Não é possível calcular pontuação com rodada aberta", 400);
        }

        const lineups = await prisma.fantasyLineup.findMany({
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
                captain: true,
            },
        });

        for (const lineup of lineups) {
            const alreadyCalculated = await this.repository.findByTeamAndRound(
                lineup.fantasyTeamId,
                roundId
            );

            if (alreadyCalculated) continue;

            let totalPoints = 0;

            for (const item of lineup.players) {
                const player = item.player;

                const stats = player.stats[0];
                if (!stats) continue;

                const isCaptain = player.id === lineup.captainId;

                totalPoints += calculatePoints(stats, isCaptain);
            }

            await this.repository.create({
                fantasyTeamId: lineup.fantasyTeamId,
                roundId,
                points: Number(totalPoints.toFixed(2)),
            });
        }

        return { message: "Pontuação calculada com sucesso" };
    }

    async rankingByRound(roundId: string) {
        return this.repository.findByRound(roundId);
    }
}