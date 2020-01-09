import { TestBed } from '@angular/core/testing';

import { InsulinDosagesService } from './insulin-dosages.service';

describe('InsulinDosagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsulinDosagesService = TestBed.get(InsulinDosagesService);
    expect(service).toBeTruthy();
  });
});
