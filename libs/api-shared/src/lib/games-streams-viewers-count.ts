export interface GameStreamsViewersCount {
  id: string
  name: string
  abrev: string
  viewersCount?: number
}

export interface GamesStreamsViewersCountEvent {
  channel: GamesStreamsEventsChannelsEnum.STATS_UPDATE
  message: GameStreamsViewersCount[]
}

export enum GamesStreamsEventsChannelsEnum {
  STATS_UPDATE = 'GAMES_STREAMS_STATS_UPDATE'
}

export enum GamesNamesEnum {
  RAINBOW_SIX_SIEGE = 'Rainbow Six Siege',
  FAR_CRY_5 = 'Far Cry 5',
  ASSASSINS_CREED_ODYSSEY = 'Assassin’s Creed Odyssey'
}

export enum GamesIdsEnum {
  RAINBOW_SIX_SIEGE = '460630',
  FAR_CRY_5 = '497078',
  ASSASSINS_CREED_ODYSSEY = '506274'
}

export enum GamesAbrevEnum {
  RAINBOW_SIX_SIEGE = 'R6S',
  FAR_CRY_5 = 'FC5',
  ASSASSINS_CREED_ODYSSEY = 'ACO'
}
