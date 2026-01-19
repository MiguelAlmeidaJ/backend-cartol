import { prisma } from "../../../config/prisma";

export class RealTeamRepository {
    create(data: { name: string; shortName: string }) {
        return prisma.realTeam.create({
            data
        });
    }

    findAll() {
        return prisma.realTeam.findMany({
            orderBy: { name: 'asc' }
        })
    }

    findById(id: string) {
        return prisma.realTeam.findUnique({
            where: { id },
        });
    }
}