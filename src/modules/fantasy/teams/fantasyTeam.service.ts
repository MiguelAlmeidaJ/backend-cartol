import { AppError } from "../../../shared/errors/AppError.js";
import { FantasyTeamRepository } from "./fantasyTeam.repository.js";

export class FantasyTeamService {
    constructor(
        private repository = new FantasyTeamRepository()
    ) {}

    async create(userId: string, name: string) {
        return this.repository.create(userId, name);
    }

    async findByUser(userId: string) {
        return this.repository.findByUser(userId);
    }

    async findById(id: string) {
        const team = await this.repository.findById(id);

        if (!team) {
            throw new AppError("Time não encontrado", 404);
        }

        return team;
    }

    async update(id: string, name: string) {
        await this.findById(id);
        return this.repository.update(id, { name })
    }
}