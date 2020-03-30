import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoStatsGraphicComponent } from './meteo-stats-graphic.component';

describe('MeteoStatsGraphicComponent', () => {
  let component: MeteoStatsGraphicComponent;
  let fixture: ComponentFixture<MeteoStatsGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoStatsGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoStatsGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
