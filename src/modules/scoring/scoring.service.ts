import { AppError } from '../../shared/errors/AppError.js';
import { calculatePoints } from '../../shared/utils/calculatePoints.js';
import { ScoringRepository } from './scoring.repository.js';

export class ScoringService {
  constructor(
    private readonly scoringRepository: ScoringRepository,
  ) {}

  async processRound(roundId: string) {
    const round = await this.scoringRepository.findRoundById(roundId);

    if (!round) {
      throw new AppError('Rodada não encontrada', 404);
    }

    if (round.isOpen) {
      throw new AppError('A rodada ainda está aberta', 400);
    }

    if (round.isProcessed) {
      throw new AppError('Rodada já foi processada', 400);
    }

    const lineups = await this.scoringRepository.findLineupsByRound(roundId);

    if (lineups.length === 0) {
      throw new AppError('Nenhuma escalação encontrada', 400);
    }

    const scoresMap: Record<string, number> = {};

    for (const lineup of lineups) {
      for (const lineupPlayer of lineup.players) {
        const stats = lineupPlayer.player.stats[0];
        if (!stats) continue;

        const isCaptain =
          lineup.captainId === lineupPlayer.playerId;

        const points = calculatePoints(stats, isCaptain);

        if (!scoresMap[lineup.fantasyTeamId]) {
          scoresMap[lineup.fantasyTeamId] = 0;
        }

        scoresMap[lineup.fantasyTeamId] += points;
      }
    }

    const fantasyScoresData = Object.entries(scoresMap).map(
      ([fantasyTeamId, points]) => ({
        fantasyTeamId,
        roundId,
        points,
      }),
    );

    await this.scoringRepository.createFantasyScores(
      fantasyScoresData,
    );

    await this.scoringRepository.markRoundAsProcessed(roundId);

    return {
      roundId,
      teamsProcessed: fantasyScoresData.length,
    };
  }
}
