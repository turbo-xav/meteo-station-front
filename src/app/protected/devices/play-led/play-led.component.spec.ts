import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLedComponent } from './play-led.component';

describe('PlayLedComponent', () => {
  let component: PlayLedComponent;
  let fixture: ComponentFixture<PlayLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
