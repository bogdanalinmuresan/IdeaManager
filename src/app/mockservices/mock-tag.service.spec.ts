import { TestBed, inject } from '@angular/core/testing';

import { MockTagService } from './mock-tag.service';

describe('MockTagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockTagService]
    });
  });

  it('should be created', inject([MockTagService], (service: MockTagService) => {
    expect(service).toBeTruthy();
  }));
});
