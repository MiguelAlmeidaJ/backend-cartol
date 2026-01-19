import { Express } from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { realTeamRoutes } from "./modules/competition/realTeams/realTeam.routes.js";
import { playersRoutes } from "./modules/competition/players/players.routes.js";
import { roundsRoutes } from "./modules/competition/rounds/rounds.routes.js";
import { matchesRoutes } from "./modules/competition/matches/matches.routes.js";
import { statsRoutes } from "./modules/competition/stats/stats.routes.js";
import { fantasyTeamRoutes } from "./modules/fantasy/teams/fantasyTeam.routes.js";
import { fantasyLineupRoutes } from "./modules/fantasy/lineup/fantasyLineup.routes.js";
import { fantasyScoreRoutes } from "./modules/fantasy/scores/fantasyScore.routes.js";
import { leagueRoutes } from "./modules/leagues/league.routes.js";
import { scoringRoutes } from "./modules/scoring/scoring.routes.js";
import { rankingRoutes } from "./modules/ranking/ranking.routes.js";

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
