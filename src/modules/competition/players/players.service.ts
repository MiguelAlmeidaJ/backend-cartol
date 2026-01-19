import { AppError } from "../../../shared/errors/AppError";
import { PlayersRepository } from "./players.repository";
import { CreatePlayerDTO, UpdatePlayerDTO } from "./players.dto";

export class PlayersService {
    constructor(
        private repository = new PlayersRepository()
    ) {}

    async create(data: CreatePlayerDTO) {
        return this.repository.create(data);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        const player = await this.repository.findById(id);

        if (!player) {
            throw new AppError('Jogador não encontrado', 404);
        }

        return player;
    }

    async update(id: string, data: UpdatePlayerDTO) {
        await this.findById(id);
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        await this.findById(id);
        await this.repository.delete(id);
    }
}