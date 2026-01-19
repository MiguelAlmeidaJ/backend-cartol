import { prisma } from "../../../config/prisma";
import { CreateMatchDTO, UpdateMatchDTO } from "./matches.dto";

export class MatchesRepository {
    create(data: CreateMatchDTO) {
        return prisma.match.create({ 
            data,
            include: {
                homeTeam: true,
                awayTeam: true,
                round: true,
            },
        });
    }

    findAll() {
        return prisma.match.findMany({
            include: {
                homeTeam: true,
                awayTeam: true,
                round: true,
            },
            orderBy: {
                round: { number: 'asc' },
            },
        });
    }

    findById(id: string) {
        return prisma.match.findUnique({
            where: { id },
            include: {
                homeTeam: true,
                awayTeam: true,
                round: true,
            },
        });
    }

    findByRound(roundId: string) {
        return prisma.match.findMany({
            where: { roundId },
            include: {
                homeTeam: true,
                awayTeam: true,
            },
        });
    }

    update(id: string, data: UpdateMatchDTO) {
        return prisma.match.update({
            where: { id },
            data,
        });
    }

    delete(id: string) {
        return prisma.match.delete({
            where: { id },
        });
    }
}