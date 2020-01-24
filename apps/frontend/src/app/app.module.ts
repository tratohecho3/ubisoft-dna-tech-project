import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { PubnubService } from './services/pubnub.service'
import { BarchartComponent } from './components/barchart/barchart.component'
import { PubNubAngular } from 'pubnub-angular2'

@NgModule({
    BarchartComponent
  providers: [PubnubService, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule {}
