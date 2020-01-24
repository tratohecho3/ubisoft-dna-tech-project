export interface GameStreamsViewersCount {
  id: string
  name: string
  viewersCount?: number
}

export interface GamesStreamsViewersCountEvent {
  channel: GamesStreamsEventsChannelsEnum.STATS_UPDATE
  message: GameStreamsViewersCount[]
}

export enum GamesStreamsEventsChannelsEnum {
  STATS_UPDATE = 'GAMES_STREAMS_STATS_UPDATE'
}
