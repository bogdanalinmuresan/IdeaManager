import { TestBed, inject } from '@angular/core/testing';

import { MockCommentService } from './mock-comment.service';

describe('MockCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockCommentService]
    });
  });

  it('should be created', inject([MockCommentService], (service: MockCommentService) => {
    expect(service).toBeTruthy();
  }));
});
