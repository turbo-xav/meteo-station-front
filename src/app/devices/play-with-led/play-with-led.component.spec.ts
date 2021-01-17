import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayWithLedComponent } from './play-with-led.component';

describe('PlayWithLedComponent', () => {
  let component: PlayWithLedComponent;
  let fixture: ComponentFixture<PlayWithLedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayWithLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayWithLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
