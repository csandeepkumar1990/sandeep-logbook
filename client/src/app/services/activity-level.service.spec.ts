import { TestBed } from '@angular/core/testing';

import { ActivityLevelService } from './activity-level.service';

describe('ActivityLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityLevelService = TestBed.get(ActivityLevelService);
    expect(service).toBeTruthy();
  });
});
