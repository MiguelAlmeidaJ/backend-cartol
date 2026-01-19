import { AppError } from "../../../shared/errors/AppError.js";
import { StatsRepository } from "./stats.repository.js";
import { CreatePlayerMatchStatsDTO, UpdatePlayerMatchStatsDTO } from "./stats.dto.js";
import { prisma } from "../../../config/prisma.js";

export class StatsService {
    constructor(
        private repository = new StatsRepository()
    ) {}

    async create(data: CreatePlayerMatchStatsDTO) {
        const match = await prisma.match.findUnique({
            where: { id: data.matchId },
            include: { round: true }
        });

        if (!match) {
            throw new AppError("Partida não encontrada", 404);
        }

        if (!match.round.isOpen) {
            throw new AppError("Não é possível registrar estatísticas em uma rodada fechada", 400);
        }

        const player = await prisma.player.findUnique({
            where: { id: data.playerId },
        });

        if (!player || !player.active) {
            throw new AppError("Jogador não encontrado ou não está ativo", 404);
        }

        const statsExits = await this.repository.findByPlayerAndMatch(data.playerId, data.matchId);

        if (statsExits) {
            throw new AppError("Jogador já possui estatísticas para esta partida", 409);
        }

        return this.repository.create(data);
    }

    async findById(id: string) {
        const stat = await this.repository.findById(id);

        if (!stat) {
            throw new AppError("Não foi possível encontrar as estatísticas", 404);
        }

        return stat;
    }

    async findByMatch(matchId: string) {
        return this.repository.findByMatch(matchId);
    }

    async update(id: string, data: UpdatePlayerMatchStatsDTO) {
        const stat = await this.findById(id);

        if (!stat.match.round.isOpen) {
            throw new AppError("Não é possível atualizar estatísticas em uma rodada fechada", 400);
        }

        return this.repository.update(id, data);
    }
}