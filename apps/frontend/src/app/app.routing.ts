import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TwitchGamesStreamsViewersCountLayout } from './layouts/twitch-games-viewers-count/twitch-games-streams-viewers-count.layout'

const routes: Routes = [
  { path: '', component: TwitchGamesStreamsViewersCountLayout },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
