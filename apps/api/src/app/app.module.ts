import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'
import configurations from '../configs/configurations'
import { TwitchModule } from './modules/twitch/twitch.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend')
    }),
    ScheduleModule.forRoot(),
    TwitchModule
  ],
  providers: [ConfigService]
})
export class AppModule {}
