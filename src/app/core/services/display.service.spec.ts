import { TestBed } from '@angular/core/testing';

import { DisplayService } from './display.service';
import { CoreModule } from '../core.module';

describe('DisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule
    ]
  }));

  it('should be created', () => {
    const service: DisplayService = TestBed.get(DisplayService);
    expect(service).toBeTruthy();
  });
});
