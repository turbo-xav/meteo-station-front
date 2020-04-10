import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CoreModule } from '../core.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
