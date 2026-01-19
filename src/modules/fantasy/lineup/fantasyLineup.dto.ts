export interface FormationDTO {
    GOLEIRO: number;
    ZAGUEIRO: number;
    LATERAL: number;
    MEIA: number;
    ATACANTE: number;
}

export interface CreateFantasyLineupDTO {
    roundId: string;
    playersIds: string[];
    captainId: string;
    formation: FormationDTO;
}

export interface UpdateFantasyLineupDTO {
    playersIds: string[];
    captainId: string;
}