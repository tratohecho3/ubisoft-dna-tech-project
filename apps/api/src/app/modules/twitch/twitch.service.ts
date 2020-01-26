import { Injectable, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import constants from './twitch.constants'
import { map, expand, reduce, retryWhen, delayWhen } from 'rxjs/operators'
import { EMPTY, Observable, timer, throwError } from 'rxjs'
import {
  TwitchHttpConfig,
  TwitchStreamsPage,
  TwitchStreamsPageData
} from './twitch.interfaces'

@Injectable()
export class TwitchService {
  private readonly _httpConfig: TwitchHttpConfig

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
   * If we reach the API request limit, retry the request in a certain delay.
   */
  private _handleAPILimit() {
    return retryWhen(error =>
      error.pipe(
        delayWhen((err: any) =>
          err.response.status === constants.API_TOO_MANY_REQUEST_STATUS_CODE
            ? timer(constants.API_TOO_MANY_REQUEST_RETRY_DELAY)
            : throwError(err)
        )
      )
    )
  }

  private _requestStreamsViewerCount(
    gamesIds: string[],
    cursorPosition?: string
  ) {
    return this._httpService
      .get<TwitchStreamsPage>(
        this._buildGetStreamsDataUrl(gamesIds, cursorPosition),
        this._httpConfig
      )
      .pipe(
        this._handleAPILimit(),
        map(({ data: { data, pagination } }: { data: TwitchStreamsPage }) => ({
          data,
          cursorPosition,
          nextCursorPosition: pagination.cursor
        }))
      )
  }

  /**
   * Get all streams viewers by games.
   */
  private _getAllStreamsDataWithViewersByGamesIds$(
    gamesIds: string[]
  ): Observable<TwitchStreamsPageData[]> {
    /**
     * Gets information about active streams. Streams are returned sorted by number
     * of current viewers, in descending order. Across multiple pages of results,
     */
    return this._requestStreamsViewerCount(gamesIds).pipe(
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
          return this._requestStreamsViewerCount(gamesIds, cursorPosition)
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
        (acc: any, value: TwitchStreamsPage) => acc.concat(...value.data),
        []
      ),
      /**
       * Filter out all streams without viewers.
       */
      map<TwitchStreamsPageData[], TwitchStreamsPageData[]>(streams =>
        streams.filter(stream => stream.viewer_count > 0)
      )
    )
  }

  /**
   * For all games, sum up the total viewers count from streams data.
   * @param gamesIds If none given, takes the default ids from constants.
   */
  getGamesStreamsViewersCount(gamesIds = constants.GAMES.map(game => game.id)) {
    return this._getAllStreamsDataWithViewersByGamesIds$(gamesIds).pipe(
      map(streams =>
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
