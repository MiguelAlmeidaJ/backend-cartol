import { prisma } from "../../config/prisma.js";

export class LeagueRepository {
  create(data: {
    name: string;
    isPrivate: boolean;
    inviteCode?: string;
  }) {
    return prisma.league.create({
      data,
    });
  }

  findById(id: string) {
    return prisma.league.findUnique({
      where: { id },
    });
  }

  findByInviteCode(code: string) {
    return prisma.league.findUnique({
      where: { inviteCode: code },
    });
  }

  addMember(
    leagueId: string,
    fantasyTeamId: string
  ) {
    return prisma.leagueMember.create({
      data: {
        leagueId,
        fantasyTeamId,
      },
    });
  }
}
