import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as PubNub from 'pubnub'

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

  /**
   * Check if there's any client listening to the channel.
   */
  async hasOccupantsOnChannel(channel: string) {
    const hereNowData = await this._pubnub.hereNow({
      channels: [channel]
    })
    return hereNowData.totalOccupancy > 0 ? true : false
  }

  publishEvent(event: { channel: string; message: any }) {
    return this._pubnub.publish(event)
  }
}
