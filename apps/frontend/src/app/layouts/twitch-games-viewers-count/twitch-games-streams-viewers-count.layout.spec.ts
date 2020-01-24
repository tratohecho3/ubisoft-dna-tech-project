import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TwitchGamesStreamsViewersCountLayout } from './twitch-games-streams-viewers-count.layout'

describe('TwitchGamesStreamsViewersCountLayout', () => {
  let component: TwitchGamesStreamsViewersCountLayout
  let fixture: ComponentFixture<TwitchGamesStreamsViewersCountLayout>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitchGamesStreamsViewersCountLayout]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchGamesStreamsViewersCountLayout)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
