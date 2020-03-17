import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoStatsComponent } from './meteo-stats.component';

describe('MeteoStatsComponent', () => {
  let component: MeteoStatsComponent;
  let fixture: ComponentFixture<MeteoStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
