export interface GameStreamsStats {
  id: string
  name: string
  viewersCount?: number
}

export interface GamesStreamsStatsEvent {
  channel: EnumGamesStreamsEvents.STATS_UPDATE
  message: GameStreamsStats[]
}

export enum EnumGamesStreamsEvents {
  STATS_UPDATE = 'GAMES_STREAMS_STATS_UPDATE'
}
