import { Module } from '@nestjs/common'
import { PubnubService } from './pubnub.service'

@Module({
  providers: [PubnubService],
  exports: [PubnubService]
})
export class PubnubModule {}
