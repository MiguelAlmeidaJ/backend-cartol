export interface CreateMatchDTO {
    roundId: string;
    homeTeamId: string;
    awayTeamId: string;
}

export interface UpdateMatchDTO {
    homeTeamId?: string;
    awayTeamId?: string;
}