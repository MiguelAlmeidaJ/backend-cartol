export interface CreateLeagueDTO {
  name: string;
  isPrivate?: boolean;
}

export interface JoinLeagueDTO {
  inviteCode?: string;
}
