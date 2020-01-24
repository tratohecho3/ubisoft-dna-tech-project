export interface TwitchStreamsPage {
  data: TwitchStreamsPageData[]
  pagination: {
    cursor: string
  }
}

export interface TwitchStreamsPageData {
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
}

export interface TwitchHttpConfig {
  headers: {
    'client-id': string
    authorization: string
  }
}
