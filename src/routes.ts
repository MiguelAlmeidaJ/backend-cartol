import { Express } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/user.routes";
import { realTeamRoutes } from "./modules/competition/realTeams/realTeam.routes";
import { playersRoutes } from "./modules/competition/players/players.routes";
import { roundsRoutes } from "./modules/competition/rounds/rounds.routes";
import { matchesRoutes } from "./modules/competition/matches/matches.routes";
import { statsRoutes } from "./modules/competition/stats/stats.routes";
import { fantasyTeamRoutes } from "./modules/fantasy/teams/fantasyTeam.routes";
import { fantasyLineupRoutes } from "./modules/fantasy/lineup/fantasyLineup.routes";
import { fantasyScoreRoutes } from "./modules/fantasy/scores/fantasyScore.routes";
import { leagueRoutes } from "./modules/leagues/league.routes";
import { scoringRoutes } from "./modules/scoring/scoring.routes";
import { rankingRoutes } from "./modules/ranking/ranking.routes";

export function routes(app: Express) {
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/competition/teams', realTeamRoutes);
    app.use('/competition/players', playersRoutes);
    app.use('/competition/rounds', roundsRoutes);
    app.use('/competition/matches', matchesRoutes);
    app.use('/competition/stats', statsRoutes);
    app.use('/fantasy/teams', fantasyTeamRoutes);
    app.use('/fantasy/lineups', fantasyLineupRoutes);
    app.use('/fantasy/scores', fantasyScoreRoutes);
    app.use('/leagues', leagueRoutes);
    app.use('/scoring', scoringRoutes);
    app.use('/ranking', rankingRoutes);
}
