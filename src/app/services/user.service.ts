import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  public user = new User;
  private isLoggedIn: boolean;
  public currentUser = new BehaviorSubject<User>(this.user);

  private regularUser: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.authService.isAuthorized.subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
      if(isAuth)
      {
        this.afAuth.auth.onAuthStateChanged((user) => {
          if(user != null)
          {
            this.user.id = user.uid;
            this.user.Name = user.displayName;
            this.user.Email = user.email;
            this.isManager(user.uid);
            this.currentUser.next(this.user);
            this.isApproved(user.uid);
          }
          else
          {
            this.isLoggedIn = false;
            this.user = new User();
          }
        });
      }
      else
      {
        this.user = new User();
        this.currentUser.next(this.user);
      }
    });
   }

  public updateName(uid: string, name: string) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: ''
    });
    this.afDb.database.ref(`Users/${uid}`).set({
      Name: name
    });
  }

  public getRegularUsers(): Observable<User[]> {
    return this.afDb.list('Users', ref => ref.orderByChild('Approved').equalTo(true))
      .snapshotChanges()
      .map(arr => {
        return arr.filter(item => {
          return item.key != this.user.id;
        }).map(item => {
          const user = new User;
          user.id = item.key;
          user.Name = item.payload.val().Name;
          user.Email = item.payload.val().Email;
          return user;
        });
      });
  }

  public createUser(uid: string, name: string, email: string) {
    return this.afDb.database.ref(`Users/${uid}`).set({
      Name: name,
      Approved: false,
      Email: email
    });
  }

  public updateUser(uid: string, name: string, email: string) {
    return this.afDb.object(`Users/${uid}`).update({
      Name: name,
      Email: email
    });
  }

  public deleteUser(uid: string, onComplete?: (a: Error | null) => any) {

    return this.afDb.database.ref(`Users/${uid}`).remove(onComplete);
  }

  public approveUser(uid: string, onComplete?: (a: Error | null) => any) {

    return this.afDb.database.ref(`Users/${uid}/Approved`).set(true, onComplete);
  }

  public getPendingUsers(): Observable<User[]> {
    return this.afDb.list('Users/', ref => ref.orderByChild('Approved').equalTo(false))
      .snapshotChanges().map((arr) => {
        return arr.map((item) => {
          const user = new User;
          user.id = item.key;
          user.Name = item.payload.val().Name;
          user.Email = item.payload.val().Email;
          user.Approved = item.payload.val().Approved;
          return user;
        });
      });
  }

  private isManager(uid: string) {

    this.user.Manager = false;

    this.afDb.object(`Managers/${uid}`).snapshotChanges().subscribe((snapshot) => {
      this.user.Manager = snapshot !== null;
    },
    (error) => {
     // No permission, i.e. user is not manager!
    });

  }

  private isApproved(uid: string) {
    this.afDb.object(`Users/${uid}`).snapshotChanges().take(1).subscribe((user) => {
      this.user.Approved = user.payload.val().Approved;
      this.currentUser.next(this.user);
    });
  }

}
