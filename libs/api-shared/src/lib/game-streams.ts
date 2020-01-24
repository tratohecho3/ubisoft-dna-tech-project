export interface GameStreamsStats {
  id: string
  name: string
  viewersCount?: number
}

export interface GameStreamsStatsEvent {
  channel: 'GAMES_STREAMS_STATS_UPDATE'
  message: GameStreamsStats[]
}
