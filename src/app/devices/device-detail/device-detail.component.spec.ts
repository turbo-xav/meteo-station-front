import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/generic/core/core.module';
import { SharedModule } from 'src/app/generic/shared/shared.module';

import { DeviceDetailComponent } from './device-detail.component';

describe('DeviceDetailComponent', () => {
  let component: DeviceDetailComponent;
  let fixture: ComponentFixture<DeviceDetailComponent>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
    imports: [
        SharedModule,
        CoreModule,
        RouterTestingModule,
        HttpClientTestingModule
    ],
    declarations: [DeviceDetailComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
