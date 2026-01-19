import { AppError } from "../../shared/errors/AppError.js";
import { LeagueRepository } from "./league.repository.js";
import { CreateLeagueDTO } from "./league.dto.js";
import { randomUUID } from "crypto";

export class LeagueService {
  private repository = new LeagueRepository();

  async create(data: CreateLeagueDTO) {
    const league = await this.repository.create({
      name: data.name,
      isPrivate: data.isPrivate ?? false,
      inviteCode: data.isPrivate
        ? randomUUID()
        : undefined,
    });

    return league;
  }

  async join(
    fantasyTeamId: string,
    inviteCode?: string
  ) {
    if (!inviteCode) {
      throw new AppError(
        "Código de convite é obrigatório",
        400
      );
    }

    const league =
      await this.repository.findByInviteCode(
        inviteCode
      );

    if (!league) {
      throw new AppError(
        "Liga não encontrada",
        404
      );
    }

    return this.repository.addMember(
      league.id,
      fantasyTeamId
    );
  }
}
