import { TestBed, inject } from '@angular/core/testing';

import { MockIdeaService } from './mock-idea.service';

describe('MockIdeaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockIdeaService]
    });
  });

  it('should be created', inject([MockIdeaService], (service: MockIdeaService) => {
    expect(service).toBeTruthy();
  }));
});
