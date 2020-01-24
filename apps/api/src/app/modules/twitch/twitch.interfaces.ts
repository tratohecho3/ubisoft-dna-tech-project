export interface TwitchStreamsData {
  data: {
    id: string
    user_id: string
    user_name: string
    game_id: string
    type: string
    title: string
    viewer_count: number
    started_at: string
    language: string
    thumbnail_url: string
    tag_ids: string[]
  }[]
  pagination: {
    cursor: string
  }
}

export interface TwitchHttpConfig {
  headers: {
    'client-id': string
    authorization: string
  }
}
