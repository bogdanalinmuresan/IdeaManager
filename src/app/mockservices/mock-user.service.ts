import { Injectable } from '@angular/core';
import { User } from '../user';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MockUserService {

  private user = new User;
  public currentUser = new BehaviorSubject<User>(this.user);
  public users: Array<User>;
  public pendingUsers: Array<User>;

  constructor( ) {
    this.user = new User;
    this.user.id = "testid";
    this.user.Name = "Test user";
    this.user.Email = "test@email.com";
    this.user.Approved = false;
    this.user.Manager = false;
    this.currentUser.next(this.user);

    var user1 = new User;
    user1.id = "testid";
    user1.Name = "Test user";
    user1.Email = "test@email.com";
    user1.Approved = false;
    user1.Manager = false;

    var user2 = new User;
    user2.id = "testid2";
    user2.Name = "Test user 2";
    user2.Email = "test2@email.com";
    user2.Approved = false;
    user2.Manager = false;

    this.users = [user1, user2];
    this.pendingUsers = [user1, user2];
   }

  public updateName(uid: string, name: string) {
    // Do nothing, act like name is updated
  }

  public createUser(uid: string, name: string, email: string) {
    // Do nothing, act like user is created
  }

  public deleteUser(uid: string, onComplete?: (a: Error | null) => any) {

    const user = this.pendingUsers.find(val => val.id == uid);

    let index = this.pendingUsers.indexOf(user);
    this.pendingUsers.splice(index, 1);

    index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  public approveUser(uid: string, onComplete?: (a: Error | null) => any) {

    const user = this.pendingUsers.find(val => val.id == uid);
    user.Approved = true;

    const index = this.pendingUsers.indexOf(user);
    this.pendingUsers.splice(index, 1);
  }

  public getPendingUsers(): Observable<User[]> {
    return of(this.pendingUsers);
  }

  public getRegularUsers(): Observable<User[]> {
    return of(this.users);
  }

  public isManager(uid: string) {
    return this.pendingUsers.find(val => val.id == uid).Manager;
  }

}
