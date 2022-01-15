import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MeteoService } from './meteo.service';

describe('MeteoService', () => {
  let service: MeteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(MeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
