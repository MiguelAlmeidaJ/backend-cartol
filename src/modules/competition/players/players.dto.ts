import { Position } from "../../../generated/prisma/enums";

export interface CreatePlayerDTO {
    name: string;
    position: Position;
    price: number;
    teamId: string;
}

export interface UpdatePlayerDTO {
    name?: string;
    position?: Position;
    price?: number;
    active?: boolean;
    teamId?: string;
}