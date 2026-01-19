import { AppError } from "../../../shared/errors/AppError.js";
import { FantasyLineupRepository } from "./fantasyLineup.repository.js";
import { CreateFantasyLineupDTO } from "./fantasyLineup.dto.js";

export class FantasyLineupService {
  private repository = new FantasyLineupRepository();

  async create(
    fantasyTeamId: string,
    userId: string,
    data: CreateFantasyLineupDTO
  ) {
    const fantasyTeam =
      await this.repository.findTeamByUser(
        fantasyTeamId,
        userId
      );

    if (!fantasyTeam) {
      throw new AppError("Time fantasy não encontrado", 404);
    }

    const round =
      await this.repository.findRoundById(
        data.roundId
      );

    if (!round || !round.isOpen) {
      throw new AppError("Rodada fechada ou inválida", 400);
    }

    const exists =
      await this.repository.findExisting(
        fantasyTeamId,
        data.roundId
      );

    if (exists) {
      throw new AppError("A escalação para essa rodada já está definida", 409);
    }

    if (data.playersIds.length !== 11) {
      throw new AppError("A escalação deve conter exatamente 11 jogadores", 400);
    }

    const players = await this.repository.findPlayersByIds(data.playersIds);

    if (players.length !== 11) {
      throw new AppError("Jogadores inválidos ou inativos", 400);
    }

    if (!data.playersIds.includes(data.captainId)) {
      throw new AppError("O capitão deve estar na escalação", 400);
    }

    const formation = data.formation;

    const totalFormationPlayers =
      Object.values(formation).reduce(
        (sum, value) => sum + value,
        0
      );

    if (totalFormationPlayers !== 11) {
      throw new AppError("A formação deve totalizar 11 jogadores", 400);
    }

    const countByPosition = players.reduce(
      (acc, player) => {
        acc[player.position] =
          (acc[player.position] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    for (const position in formation) {
      if (
        countByPosition[position] !==
        formation[position as keyof typeof formation]
      ) {
        throw new AppError(`Formação inválida para ${position}`, 400);
      }
    }

    return this.repository.create({
      fantasyTeamId,
      roundId: data.roundId,
      playersIds: data.playersIds,
      captainId: data.captainId,
      formation,
    });
  }

  async show(fantasyTeamId: string, roundId: string) {
    return this.repository.findByTeamAndRound(fantasyTeamId, roundId);
  }
}
