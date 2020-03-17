import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCommandComponent } from './station-command.component';

describe('StationCommandComponent', () => {
  let component: StationCommandComponent;
  let fixture: ComponentFixture<StationCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
