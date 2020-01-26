import {
  GameStreamsViewersCount,
  GamesNamesEnum,
  GamesIdsEnum,
  GamesAbrevEnum
} from '@ubisoft-dna-tech-project/api-shared'

export default {
  API_STREAMS: `https://api.twitch.tv/helix/streams`,
  API_MAX_OBJECTS_TO_RETURN: 100,
  API_SYNC_INTERVAL_IN_MS: 5000,
  API_TOO_MANY_REQUEST_STATUS_CODE: 429,
  API_TOO_MANY_REQUEST_RETRY_DELAY: 3000,
  GAMES: [
    {
      name: GamesNamesEnum.RAINBOW_SIX_SIEGE,
      id: GamesIdsEnum.RAINBOW_SIX_SIEGE,
      abrev: GamesAbrevEnum.RAINBOW_SIX_SIEGE,
      viewersCount: null
    },
    {
      name: GamesNamesEnum.FAR_CRY_5,
      id: GamesIdsEnum.FAR_CRY_5,
      abrev: GamesAbrevEnum.FAR_CRY_5,
      viewersCount: null
    },
    {
      name: GamesNamesEnum.ASSASSINS_CREED_ODYSSEY,
      id: GamesIdsEnum.ASSASSINS_CREED_ODYSSEY,
      abrev: GamesAbrevEnum.ASSASSINS_CREED_ODYSSEY,
      viewersCount: null
    }
  ] as GameStreamsViewersCount[]
}
