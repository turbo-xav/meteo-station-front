import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoStationComponent } from './meteo-station.component';

describe('MeteoStationComponent', () => {
  let component: MeteoStationComponent;
  let fixture: ComponentFixture<MeteoStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
