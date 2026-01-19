export interface CreatePlayerMatchStatsDTO {
    playerId: string;
    matchId: string;
    goals?: number;
    assists?: number;
    yellowCard?: number;
    redCard?: number;
    minutes?: number;
}

export interface UpdatePlayerMatchStatsDTO {
    goals?: number;
    assists?: number;
    yellowCard?: number;
    redCard?: number;
    minutes?: number;
}