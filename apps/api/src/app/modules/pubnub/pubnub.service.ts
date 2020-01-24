import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as PubNub from 'pubnub'
import { GameStreamsStatsEvent } from '@ubisoft-dna-tech-project/api-shared'

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

  publishGameStreamsStatsEvent(event: GameStreamsStatsEvent) {
    return this._pubnub.publish(event)
  }
}
