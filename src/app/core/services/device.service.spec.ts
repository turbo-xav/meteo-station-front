import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { CoreModule } from '../core.module';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule
    ]
  }));

  it('should be created', () => {
    const service: DeviceService = TestBed.inject(DeviceService);
    expect(service).toBeTruthy();
  });
});
