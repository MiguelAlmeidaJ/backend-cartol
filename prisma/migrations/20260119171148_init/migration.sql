-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GOLEIRO', 'ZAGUEIRO', 'LATERAL', 'MEIA', 'ATACANTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "RealTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatchStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "yellowCard" INTEGER NOT NULL DEFAULT 0,
    "redCard" INTEGER NOT NULL DEFAULT 0,
    "minutes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FantasyTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyLineup" (
    "id" TEXT NOT NULL,
    "fantasyTeamId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "captainId" TEXT NOT NULL,
    "formation" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FantasyLineup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyLineupPlayer" (
    "id" TEXT NOT NULL,
    "lineupId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "FantasyLineupPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyScore" (
    "id" TEXT NOT NULL,
    "fantasyTeamId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FantasyScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "inviteCode" TEXT,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueMember" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "fantasyTeamId" TEXT NOT NULL,

    CONSTRAINT "LeagueMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LeagueMemberToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LeagueMemberToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Round_number_key" ON "Round"("number");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatchStats_playerId_matchId_key" ON "PlayerMatchStats"("playerId", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "FantasyLineup_fantasyTeamId_roundId_key" ON "FantasyLineup"("fantasyTeamId", "roundId");

-- CreateIndex
CREATE UNIQUE INDEX "FantasyLineupPlayer_lineupId_playerId_key" ON "FantasyLineupPlayer"("lineupId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "FantasyScore_fantasyTeamId_roundId_key" ON "FantasyScore"("fantasyTeamId", "roundId");

-- CreateIndex
CREATE UNIQUE INDEX "League_inviteCode_key" ON "League"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueMember_leagueId_fantasyTeamId_key" ON "LeagueMember"("leagueId", "fantasyTeamId");

-- CreateIndex
CREATE INDEX "_LeagueMemberToUser_B_index" ON "_LeagueMemberToUser"("B");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "RealTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "RealTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "RealTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyTeam" ADD CONSTRAINT "FantasyTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLineup" ADD CONSTRAINT "FantasyLineup_fantasyTeamId_fkey" FOREIGN KEY ("fantasyTeamId") REFERENCES "FantasyTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLineup" ADD CONSTRAINT "FantasyLineup_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLineup" ADD CONSTRAINT "FantasyLineup_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLineupPlayer" ADD CONSTRAINT "FantasyLineupPlayer_lineupId_fkey" FOREIGN KEY ("lineupId") REFERENCES "FantasyLineup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLineupPlayer" ADD CONSTRAINT "FantasyLineupPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyScore" ADD CONSTRAINT "FantasyScore_fantasyTeamId_fkey" FOREIGN KEY ("fantasyTeamId") REFERENCES "FantasyTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyScore" ADD CONSTRAINT "FantasyScore_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueMember" ADD CONSTRAINT "LeagueMember_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueMember" ADD CONSTRAINT "LeagueMember_fantasyTeamId_fkey" FOREIGN KEY ("fantasyTeamId") REFERENCES "FantasyTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueMemberToUser" ADD CONSTRAINT "_LeagueMemberToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LeagueMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueMemberToUser" ADD CONSTRAINT "_LeagueMemberToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
