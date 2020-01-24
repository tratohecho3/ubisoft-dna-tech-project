import { Test, TestingModule } from '@nestjs/testing'
import { TwitchScheduledTasksService } from './twitch-scheduled-tasks.service'

describe('TwitchScheduledTasksService', () => {
  let service: TwitchScheduledTasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitchScheduledTasksService]
    }).compile()

    service = module.get<TwitchScheduledTasksService>(
      TwitchScheduledTasksService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
