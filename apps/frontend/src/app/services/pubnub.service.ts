import { Injectable, isDevMode } from '@angular/core'
import { PubNubAngular } from 'pubnub-angular2'
import { environment } from '../../environments/environment'
import { GamesStreamsEventsChannelsEnum } from '@ubisoft-dna-tech-project/api-shared'

@Injectable({
  providedIn: 'root'
})
export class PubnubService {
  constructor(private _pubnub: PubNubAngular) {
    this._pubnub.init({
      publishKey: environment.pubnub.publishKey,
      subscribeKey: environment.pubnub.subscribeKey
    })
    this._subscribeToGamesStreamsUpdates()
  }

  private _subscribeToGamesStreamsUpdates() {
    this._pubnub.unsubscribeAll()
    this._pubnub.subscribe({
      channels: [GamesStreamsEventsChannelsEnum.STATS_UPDATE],
      withPresence: true,
      triggerEvents: ['message']
    })
  }

  /**
   * Add a listener function that will be executed each time we get an update.
   */
  addGamesStreamsUpdatesListener(
    listener: ({ message: GameStreamsViewersCount }) => any
  ) {
    this._pubnub.addListener({
      message: ({ message }) => {
        if (isDevMode()) {
          console.log('PubNub Event Received:', message)
        }

        return listener({ message })
      },
      status: status => {
        /**
         * If we loose connection at some point, restart the subscription
         * when the network is up again.
         */
        if (status.category === 'PNNetworkUpCategory') {
          this._subscribeToGamesStreamsUpdates()
        }
      }
    })
  }
}
