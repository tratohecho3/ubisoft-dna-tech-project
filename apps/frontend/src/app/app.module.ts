import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app.routing'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { TwitchGamesStreamsViewersCountLayout } from './layouts/twitch-games-viewers-count/twitch-games-streams-viewers-count.layout'
import { PubnubService } from './services/pubnub.service'
import { LinechartComponent } from './components/linechart/linechart.component'
import { PubNubAngular } from 'pubnub-angular2'
import { ChartsModule } from 'angular-bootstrap-md'
import { NgArrayPipesModule } from 'ngx-pipes'

@NgModule({
  declarations: [
    AppComponent,
    TwitchGamesStreamsViewersCountLayout,
    LinechartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    NgArrayPipesModule
  ],
  providers: [PubnubService, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule {}
