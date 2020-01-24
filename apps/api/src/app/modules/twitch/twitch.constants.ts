import { GameStreamsStats } from '@ubisoft-dna-tech-project/api-shared'

export default {
  API_STREAMS: `https://api.twitch.tv/helix/streams`,
  API_MAX_OBJECTS_TO_RETURN: 100,
  API_SYNC_INTERVAL_IN_MS: 5000,
  GAMES: [
    {
      name: 'Rainbow Six Siege',
      id: '460630',
      viewersCount: null
    },
    {
      name: 'Far Cry 5',
      id: '497078',
      viewersCount: null
    },
    {
      name: 'Assassin’s Creed Odyssey',
      id: '506274',
      viewersCount: null
    }
  ] as GameStreamsStats[]
}
