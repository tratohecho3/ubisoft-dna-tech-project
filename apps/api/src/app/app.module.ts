import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configurations } from '../../configs/configurations'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, 'configs'),
      load: [configurations]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend')
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
