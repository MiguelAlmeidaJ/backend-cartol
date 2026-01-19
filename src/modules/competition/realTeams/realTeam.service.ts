import { AppError } from "../../../shared/errors/AppError";
import { RealTeamRepository } from "./realTeam.repository";

export class RealTeamService {
    private repository = new RealTeamRepository();

    async create(name: string, shortName: string) {
        if (!name || !shortName) {
            throw new AppError('Nome e sigla são obrigatórios', 400);
        }

        if (shortName.length > 5) {
            throw new AppError('A sigla deve ter no máximo 5 caracteres', 400);
        }

        return this.repository.create({ name, shortName });
    }

    async list() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        const team = await this.repository.findById(id);

        if (!team) {
            throw new AppError('Time não encontrado', 404);
        }

        return team;
    }
}