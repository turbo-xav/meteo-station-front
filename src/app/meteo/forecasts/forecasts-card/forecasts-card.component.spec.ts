import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/generic/core/core.module';
import { SharedModule } from 'src/app/generic/shared/shared.module';
import { MeteoModule } from '../../meteo.module';

import { ForecastsCardComponent } from './forecasts-card.component';

describe('ForecastsCardComponent', () => {
  let component: ForecastsCardComponent;
  let fixture: ComponentFixture<ForecastsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastsCardComponent ],
      imports: [
        SharedModule,
        CoreModule,
        MeteoModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
