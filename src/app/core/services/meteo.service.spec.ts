import { TestBed } from '@angular/core/testing';

import { MeteoService } from './meteo.service';
import { CoreModule } from '../core.module';

describe('MeteoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule
    ]
  }));

  it('should be created', () => {
    const service: MeteoService = TestBed.get(MeteoService);
    expect(service).toBeTruthy();
  });
});
