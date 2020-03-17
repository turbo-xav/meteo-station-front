import { TestBed } from '@angular/core/testing';

import { HeaterService } from './heater.service';

describe('HeaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaterService = TestBed.get(HeaterService);
    expect(service).toBeTruthy();
  });
});
