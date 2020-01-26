import { Injectable } from '@nestjs/common'
import { PubnubService } from '../pubnub/pubnub.service'
import { TwitchService } from './twitch.service'
import { Interval } from '@nestjs/schedule'
import {
  GamesStreamsEventsChannelsEnum,
  GamesStreamsViewersCountEvent
} from '@ubisoft-dna-tech-project/api-shared'
import constants from './twitch.constants'

@Injectable()
export class TwitchScheduledTasksService {
  constructor(
    private readonly _pubnubService: PubnubService,
    private readonly _twitchService: TwitchService
  ) {}

  /**
   * Starts a scheduled task to publish latest game streams stats.
   */
  @Interval(constants.API_SYNC_INTERVAL_IN_MS)
  async handleGameStreamsViewersCountUpdates() {
    const hasOccupants = await this._pubnubService.hasOccupantsOnChannel(
      GamesStreamsEventsChannelsEnum.STATS_UPDATE
    )

    /**
     * If there's no occupants on channel, there's no need to publish updates.
     */
    if (!hasOccupants) return

    const event: GamesStreamsViewersCountEvent = {
      channel: GamesStreamsEventsChannelsEnum.STATS_UPDATE,
      message: await this._twitchService
        .getGamesStreamsViewersCount()
        .toPromise()
    }

    this._pubnubService.publishEvent(event)
  }
}
