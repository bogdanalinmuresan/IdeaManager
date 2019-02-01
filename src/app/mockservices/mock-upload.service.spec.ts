import { TestBed, inject } from '@angular/core/testing';

import { MockUploadService } from './mock-upload.service';

describe('MockUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockUploadService]
    });
  });

  it('should be created', inject([MockUploadService], (service: MockUploadService) => {
    expect(service).toBeTruthy();
  }));
});
