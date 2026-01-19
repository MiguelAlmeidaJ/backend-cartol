import { prisma } from "../../../config/prisma";

export class FantasyTeamRepository {
    create(userId: string, name: string) {
        return prisma.fantasyTeam.create({
            data: { name, userId }
        });
    }

    findByUser(userId: string) {
        return prisma.fantasyTeam.findMany({
            where: { userId }
        });
    }

    findById(id: string) {
        return prisma.fantasyTeam.findUnique({
            where: { id }
        });
    }

    update(id: string, data: Partial<{ name: string }>) {
        return prisma.fantasyTeam.update({
            where: { id },
            data
        });
    }
}