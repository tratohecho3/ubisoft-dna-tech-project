import { Component, OnInit } from '@angular/core'
import { PubnubService } from '../../services/pubnub.service'
import { ReplaySubject } from 'rxjs'
import { GameStreamsViewersCount } from '@ubisoft-dna-tech-project/api-shared'
import { ApiService } from '../../services/api.service'
import { tap, throttleTime } from 'rxjs/operators'

@Component({
  selector: 'ubisoft-dna-tech-project-twitch-games-streams-viewers-count',
  templateUrl: './twitch-games-streams-viewers-count.layout.html',
  styleUrls: ['./twitch-games-streams-viewers-count.layout.css']
})
export class TwitchGamesStreamsViewersCountLayout implements OnInit {
  private readonly _gamesStreamsViewersCount$: ReplaySubject<
    GameStreamsViewersCount[]
  > = new ReplaySubject(1)

  get gamesStreamsViewersCount$() {
    return this._gamesStreamsViewersCount$.asObservable()
  }

  constructor(
    private readonly _pubnubService: PubnubService,
    private readonly _apiService: ApiService
  ) {}

  private _fetchInitialGamesStreamsViewersCount() {
    this._apiService
      .getGamesStreamsViewersCount()
      .pipe(
        tap(gameStreamsViewersCount =>
          this._gamesStreamsViewersCount$.next(gameStreamsViewersCount)
        )
      )
      .subscribe()
  }

  private _keepGameStreamsViewersCountSynced() {
    this._pubnubService.addGamesStreamsUpdatesListener(
      ({ message: gamesStreamsViewersCount }) =>
        this._gamesStreamsViewersCount$.next(gamesStreamsViewersCount)
    )
  }

  ngOnInit() {
    this._fetchInitialGamesStreamsViewersCount()
    this._keepGameStreamsViewersCountSynced()
  }
}
