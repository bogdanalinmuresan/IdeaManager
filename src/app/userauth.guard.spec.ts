import { TestBed, async, inject } from '@angular/core/testing';

import { UserAuthGuard } from './userauth.guard';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './mockservices/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [UserAuthGuard,
        {provide: AuthService, useClass: MockAuthService}
      ]
    });
  });

  it('should ...', inject([UserAuthGuard], (guard: UserAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
