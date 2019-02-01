import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './mockservices/mock-auth.service';
import { UserService } from './services/user.service';
import { MockUserService } from './mockservices/mock-user.service';
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        AppNavbarComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: UserService, useClass: MockUserService}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
