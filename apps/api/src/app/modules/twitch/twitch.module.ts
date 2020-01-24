import { Module, HttpModule } from '@nestjs/common'
import { TwitchService } from './twitch.service'
import { TwitchController } from './twitch.controller'
import { PubnubModule } from '../pubnub/pubnub.module'

@Module({
  imports: [HttpModule, PubnubModule],
  providers: [TwitchService],
  controllers: [TwitchController]
})
export class TwitchModule {}
