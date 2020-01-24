import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { PubnubService } from './services/pubnub.service'
import { PubNubAngular } from 'pubnub-angular2'

@NgModule({
  providers: [PubnubService, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule {}
