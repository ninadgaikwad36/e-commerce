import { TestBed } from '@angular/core/testing';

import { ReleaseGuard } from './release.guard';

describe('ReleaseGuard', () => {
  let guard: ReleaseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReleaseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
