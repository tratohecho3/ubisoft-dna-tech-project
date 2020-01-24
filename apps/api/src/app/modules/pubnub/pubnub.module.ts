import { Module } from '@nestjs/common';
import { PubnubService } from './pubnub.service';

@Module({
  providers: [PubnubService]
})
export class PubnubModule {}
