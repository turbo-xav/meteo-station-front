import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/generic/core/core.module';
import { SharedModule } from 'src/app/generic/shared/shared.module';
import { MeteoModule } from '../meteo.module';

import { StationComponent } from './station.component';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
    imports: [
        SharedModule,
        CoreModule,
        MeteoModule,
        RouterTestingModule,
        HttpClientTestingModule
    ],
    declarations: [StationComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
