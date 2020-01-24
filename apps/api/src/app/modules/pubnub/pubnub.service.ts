import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as PubNub from 'pubnub'
import {
  GamesStreamsStatsEvent,
  EnumGamesStreamsEvents
} from '@ubisoft-dna-tech-project/api-shared'

@Injectable()
export class PubnubService {
  private readonly _pubnub: PubNub

  constructor(private readonly _configService: ConfigService) {
    this._pubnub = new PubNub({
      subscribeKey: this._configService.get('pubnub.subscribeKey'),
      publishKey: this._configService.get('pubnub.publishKey'),
      secretKey: this._configService.get('pubnub.secretKey')
    })
  }

  async hasOccupantsOnChannel(channel: string) {
    const { totalOccupancy } = await this._pubnub.hereNow({
      channels: [channel]
    })
    return totalOccupancy > 0 ? true : false
  }

  publishEvent(event: { channel: string; message: any }) {
    return this._pubnub.publish(event)
  }
}
