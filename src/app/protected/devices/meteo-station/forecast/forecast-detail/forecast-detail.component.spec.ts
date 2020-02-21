import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDetailComponent } from './forecast-detail.component';

describe('ForecastDetailComponent', () => {
  let component: ForecastDetailComponent;
  let fixture: ComponentFixture<ForecastDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
