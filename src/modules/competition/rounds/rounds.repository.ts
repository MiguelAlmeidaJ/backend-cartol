import { prisma } from "../../../config/prisma";
import { CreateRoundDTO, UpdateRoundDTO } from "./rounds.dto";

export class RoundsRepository {
    create(data: CreateRoundDTO) {
        return prisma.round.create({ data });
    }

    findAll() {
        return prisma.round.findMany({
            orderBy: { number: 'asc' }
        });
    }

    findById(id: string) {
        return prisma.round.findUnique({
            where: { id }
        });
    }

    findByNumber(number: number) {
        return prisma.round.findUnique({
            where: { number }
        });
    }

    update(id: string, data: UpdateRoundDTO) {
        return prisma.round.update({
            where: { id },
            data
        });
    }
}