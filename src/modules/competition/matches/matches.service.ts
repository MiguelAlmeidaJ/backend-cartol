import { AppError } from "../../../shared/errors/AppError.js";
import { MatchesRepository } from "./matches.repository.js";
import { CreateMatchDTO, UpdateMatchDTO } from "./matches.dto.js";
import { prisma } from "../../../config/prisma.js";

export class MatchesService {
  constructor(
    private repository = new MatchesRepository()
  ) {}

  async create(data: CreateMatchDTO) {
    if (data.homeTeamId === data.awayTeamId) {
      throw new AppError("Um time não pode jogar contra ele mesmo", 400);
    }

    const round = await prisma.round.findUnique({
      where: { id: data.roundId }
    });

    if (!round) {
      throw new AppError("Rodada não encontrada", 404);
    }

    if (!round.isOpen) {
      throw new AppError("Não é possível jogar em uma rodada fechada", 400);
    }

    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const match = await this.repository.findById(id);

    if (!match) {
      throw new AppError("Não foi possível encontrar a partida", 404);
    }

    return match;
  }

  async findByRound(roundId: string) {
    return this.repository.findByRound(roundId);
  }

  async update(id: string, data: UpdateMatchDTO) {
    await this.findById(id);
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.repository.delete(id);
  }
}