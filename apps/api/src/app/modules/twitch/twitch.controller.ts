import { Controller, Get } from '@nestjs/common'
import { TwitchService } from './twitch.service'

@Controller('twitch')
export class TwitchController {
  constructor(private readonly _twitchService: TwitchService) {}

  @Get('games-viewers-count')
  async getGamesStreamsViewersCount() {
    return await this._twitchService.getGamesStreamsViewersCount().toPromise()
  }
}
