import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mockservices/mock-auth.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ ProfileComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: AuthService, useClass: MockAuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
