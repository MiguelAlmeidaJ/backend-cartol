export interface CreateRoundDTO {
    number: number;
    startsAt: Date;
    endsAt: Date;
}

export interface UpdateRoundDTO {
    isOpen?: boolean;
    startsAt?: Date;
    endsAt?: Date;
}