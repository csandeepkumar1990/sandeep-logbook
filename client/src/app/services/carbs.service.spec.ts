import { TestBed } from '@angular/core/testing';

import { CarbsService } from './carbs.service';

describe('CarbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarbsService = TestBed.get(CarbsService);
    expect(service).toBeTruthy();
  });
});
