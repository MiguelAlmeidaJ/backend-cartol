import { prisma } from "../../../config/prisma.js";
import { CreatePlayerDTO, UpdatePlayerDTO } from "./players.dto.js";

export class PlayersRepository {
  create(data: CreatePlayerDTO) {
    return prisma.player.create({ data });
  }

  findAll() {
    return prisma.player.findMany({
      include: {
        team: true
      }
    });
  }

  findById(id: string) {
    return prisma.player.findUnique({
      where: { id },
      include: {
        team: true
      }
    });
  }

  update(id: string, data: UpdatePlayerDTO) {
    return prisma.player.update({
      where: { id },
      data
    });
  }

  delete(id: string) {
    return prisma.player.delete({
      where: { id }
    });
  }
}