import { Injectable, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import constants from './twitch.constants'
import { map, expand, reduce, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { TwitchHttpConfig, TwitchStreamsData } from './twitch.interfaces'

@Injectable()
export class TwitchService {
  private readonly _httpConfig: TwitchHttpConfig
  private readonly _requestStreamsViewerCount$ = (
    gamesIds: string[],
    cursorPosition?: string
  ) =>
    this._httpService
      .get<TwitchStreamsData>(
        this._buildGetStreamsDataUrl(gamesIds, cursorPosition),
        this._httpConfig
      )
      .pipe(
        map(({ data: { data, pagination } }) => ({
          data,
          cursorPosition,
          nextCursorPosition: pagination.cursor
        }))
      )

  /**
   * Documentations for `/streams` [API doc on Streams](https://dev.twitch.tv/docs/api/reference#get-streams)
   */
  private _buildGetStreamsDataUrl(gamesIds: string[], cursorPosition?: string) {
    return (
      `${constants.API_STREAMS}?`
        // after: Cursor for forward pagination,
        // The cursor value specified here is from the pagination response field of a prior query.
        .concat(cursorPosition ? `after=${cursorPosition}` : '')
        // first: Maximum number of objects to return. Maximum: 100. Default: 20.
        .concat(`&first=${constants.API_MAX_OBJECTS_TO_RETURN}`)
        // game_id: Returns streams broadcasting a specified game ID. You can specify up to 100 IDs.
        .concat(gamesIds.map(id => `&game_id=${id}`).join('&'))
    )
  }

  /**
   * Get all streams viewers by games.
   */
  private _getAllStreamsWithViewersByGamesIds$(gamesIds: string[]) {
    /**
     * Gets information about active streams. Streams are returned sorted by number
     * of current viewers, in descending order. Across multiple pages of results,
     */
    return this._requestStreamsViewerCount$(gamesIds).pipe(
      // TODO: Add throttle logic
      /**
       * Recursively call request with the nextCursor position to fetch all remaining
       * streams until we hit the last page or a page that contains a viewer_count
       * of 0 since list are sorted in descending order.
       */
      expand(({ data, cursorPosition, nextCursorPosition }) => {
        const reachedLastPage = cursorPosition === nextCursorPosition
        const reachedLastStreamsPageWithViewers = data.some(
          streams => streams.viewer_count === 0
        )

        if (!reachedLastPage && !reachedLastStreamsPageWithViewers) {
          cursorPosition = nextCursorPosition
          return this._requestStreamsViewerCount$(gamesIds, cursorPosition)
        }
        /**
         * We reached the last page, complete the observable.
         */
        return EMPTY
      }),
      /**
       * Reduces the values from source observable to a single value that's emitted
       * when the source completes.
       */
      reduce(
        (acc: any, value: TwitchStreamsData) => acc.concat(...value.data),
        []
      )
    )
  }

  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService
  ) {
    this._httpConfig = {
      headers: {
        'client-id': this._configService.get('twitch.clientId'),
        authorization: `Bearer ${this._configService.get('twitch.token')}`
      }
    }
  }

  getGamesStreamsViewersCount$(
    gamesIds = constants.GAMES.map(game => game.id)
  ) {
    return this._getAllStreamsWithViewersByGamesIds$(gamesIds).pipe(
      /**
       * For all games, sum up the total viewers count from streams data.
       */
      map((streams: TwitchStreamsData['data']) =>
        constants.GAMES.map(gameStats => ({
          ...gameStats,
          viewersCount: streams
            .filter(stream => stream.game_id === gameStats.id)
            .reduce((acc, stream) => acc + stream.viewer_count, 0)
        }))
      )
    )
  }
}
