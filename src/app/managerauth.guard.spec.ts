import { TestBed, async, inject } from '@angular/core/testing';

import {ManagerAuthGuard} from './managerauth.guard';
import { UserService } from './services/user.service';
import { MockUserService } from './mockservices/mock-user.service';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './mockservices/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ManagerAuthGuard,
        {provide: UserService, useClass: MockUserService},
        {provide: AuthService, useClass: MockAuthService}
      ]
    });
  });

  it('should ...', inject([ManagerAuthGuard], (guard: ManagerAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
