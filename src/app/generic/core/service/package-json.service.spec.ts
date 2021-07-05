import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PackageJsonService } from './package-json.service';

describe('PackageJsonService', () => {
  let service: PackageJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PackageJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
