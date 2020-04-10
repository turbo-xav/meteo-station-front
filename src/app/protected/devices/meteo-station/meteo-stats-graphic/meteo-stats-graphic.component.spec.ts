import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoStatsGraphicComponent } from './meteo-stats-graphic.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

describe('MeteoStatsGraphicComponent', () => {
  let component: MeteoStatsGraphicComponent;
  let fixture: ComponentFixture<MeteoStatsGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        CoreModule
      ]
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
