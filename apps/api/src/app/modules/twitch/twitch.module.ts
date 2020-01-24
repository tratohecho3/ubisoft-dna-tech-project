import { Module, HttpModule } from '@nestjs/common'
import { TwitchService } from './twitch.service'
import { TwitchController } from './twitch.controller'

@Module({
  imports: [HttpModule],
  providers: [TwitchService],
  controllers: [TwitchController]
})
export class TwitchModule {}
