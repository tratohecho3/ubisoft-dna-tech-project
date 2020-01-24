import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app.routing'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { TwitchGamesStreamsViewersCountLayout } from './layouts/twitch-games-viewers-count/twitch-games-streams-viewers-count.layout'
import { PubnubService } from './services/pubnub.service'
import { BarchartComponent } from './components/barchart/barchart.component'
import { PubNubAngular } from 'pubnub-angular2'

@NgModule({
  declarations: [
    AppComponent,
    TwitchGamesStreamsViewersCountLayout,
    BarchartComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [PubnubService, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule {}
