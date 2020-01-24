import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { GameStreamsViewersCount } from '@ubisoft-dna-tech-project/api-shared'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  getGamesStreamsViewersCount() {
    return this._http.get<GameStreamsViewersCount[]>(
      `${environment.routes.apiRoot}/twitch/games-viewers-count`
    )
  }
}
