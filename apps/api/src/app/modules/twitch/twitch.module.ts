import { Module, HttpModule } from '@nestjs/common'
import { TwitchService } from './twitch.service'
import { TwitchController } from './twitch.controller'
import { PubnubModule } from '../pubnub/pubnub.module'
import { TwitchScheduledTasksService } from './twitch-scheduled-tasks.service'

@Module({
  imports: [HttpModule, PubnubModule],
  providers: [TwitchService, TwitchScheduledTasksService],
  controllers: [TwitchController]
})
export class TwitchModule {}
