import { AppError } from "../../../shared/errors/AppError";
import { RoundsRepository } from "./rounds.repository";
import { CreateRoundDTO, UpdateRoundDTO } from "./rounds.dto";

export class RoundsService {
    constructor(
        private repository = new RoundsRepository()
    ) { }

    async create(data: CreateRoundDTO) {
        const roundExists = await this.repository.findByNumber(data.number);

        if (roundExists) {
            throw new AppError('Já existe uma rodada com este número', 409);
        }

        if (data.endsAt <= data.startsAt) {
            throw new AppError('A data de término deve ser maior que a data de início', 400);
        }

        return this.repository.create(data);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        const round = await this.repository.findById(id);

        if (!round) {
            throw new AppError('Rodada não encontrada', 404);
        }

        return round;
    }

    async update(id: string, data: UpdateRoundDTO) {
        const round = await this.findById(id);

        if (!round.isOpen) {
            throw new AppError("Não é possível atualizar uma rodada que não está aberta", 400);
        }

        if (data.startsAt && data.endsAt) {
            if (data.endsAt <= data.startsAt) {
                throw new AppError("Round end date must be after start date", 400);
            }
        }

        return this.repository.update(round.id, data);
    }

    async closeRound(id: string) {
        const round = await this.findById(id);

        if (!round.isOpen) {
            throw new AppError("Round is already closed", 400);
        }

        return this.repository.update(id, { isOpen: false });
    }

    async openRound(id: string) {
        const round = await this.findById(id);

        if (round.isOpen) {
            throw new AppError("Round is already open", 400);
        }

        return this.repository.update(id, { isOpen: true });
    }
}
