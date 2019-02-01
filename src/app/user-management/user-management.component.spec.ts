import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(this.hasError).toBeFalsy();
  });

  it('should show right headline', () => {

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toBe('User Management');
  });

  it('should contain the pending users', async(() => {

    de = fixture.debugElement.query(By.css('#noUsers'));
    el = de.nativeElement;

    expect(el.hidden).toBe(true);

    component.pendingUsers.toPromise().then(result => {
      expect(result.length).toBe(2);

        let user1 = result[0];
        let user2 = result[1];

        expect(user1.id).toEqual("testid");
        expect(user1.Name).toEqual("Test user");
        expect(user1.Email).toEqual("test@email.com");
        expect(user1.Approved).toEqual(false);
        expect(user1.Manager).toEqual(false);

        expect(user2.id).toEqual("testid2");
        expect(user2.Name).toEqual("Test user 2");
        expect(user2.Email).toEqual("test2@email.com");
        expect(user2.Approved).toEqual(false);
        expect(user2.Manager).toEqual(false);

    });
  }));

  it('should approve the user', async(() => {

    spyOn(component, 'onUserAccept').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[0];
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onUserAccept).toHaveBeenCalled();

      component.pendingUsers.toPromise().then(result => {
        expect(result.length).toBe(1);

        let user = result[0];

        expect(user.id).toEqual("testid2");

      });

      component.userList.toPromise().then(result => {

        let user = result[0];

        expect(user.Approved).toBe(true);

      });

    });

  }));

  it('should disapprove the user', async(() => {

    spyOn(component, 'onUserDelete').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onUserDelete).toHaveBeenCalled();

      return component.pendingUsers.toPromise().then(result => {
        expect(result.length).toBe(1);

        let user = result[0];

        expect(user.id).toEqual("testid2");
      });

    });

  }));

  it('should delete the user', async(() => {

    spyOn(component, 'onUserDelete').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[4];
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onUserDelete).toHaveBeenCalled();
    });

    return component.userList.toPromise().then(result => {
      expect(result.length).toBe(1);

      let user = result[0];

      expect(user.id).toEqual("testid2");
    });

  }));

  it('should clear all approvals', async(() => {

    spyOn(window, 'confirm').and.returnValue(true);

    let button1 = fixture.debugElement.nativeElement.querySelectorAll('button')[4];
    button1.click();

    let button2 = fixture.debugElement.nativeElement.querySelectorAll('button')[5];
    button2.click();

    fixture.whenStable().then(() => {

      component.userList.toPromise().then(result => {
        expect(result.length).toEqual(0);
      });

      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('#noUsers'));
      el = de.nativeElement;

      expect(el.hidden).toBe(false);
    });

  }));

  it('should clear all users', async(() => {

    spyOn(window, 'confirm').and.returnValue(true);

    let button1 = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button1.click();

    let button2 = fixture.debugElement.nativeElement.querySelectorAll('button')[3];
    button2.click();

    fixture.whenStable().then(() => {

      component.pendingUsers.toPromise().then(result => {
        expect(result.length).toEqual(0);
      });

      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('#noApprovals'));
      el = de.nativeElement;

      expect(el.hidden).toBe(false);
    });

  }));

});
