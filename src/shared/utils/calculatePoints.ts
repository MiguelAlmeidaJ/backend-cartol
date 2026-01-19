export interface PlayerStats {
  goals: number;
  assists: number;
  yellowCard: number;
  redCard: number;
  minutes: number;
}

export interface PointsConfig {
    goal: number;
    assist: number;
    yellowCard: number;
    redCard: number;
    minutePlayed: number;
}

const defaultConfig: PointsConfig = {
    goal: 3,
    assist: 1,
    yellowCard: -1,
    redCard: -3,
    minutePlayed: 0.01,
}

export function calculatePoints(
    stats: PlayerStats,
    isCaptain = false,
    config: PointsConfig = defaultConfig
): number {
    let points = 0;

    points += stats.goals * config.goal;
    points += stats.assists * config.assist;
    points += stats.yellowCard * config.yellowCard;
    points += stats.redCard * config.redCard;
    points += stats.minutes * config.minutePlayed;

    if (isCaptain) {
        points *= 2;
    }

    return Number(points.toFixed(2));
}