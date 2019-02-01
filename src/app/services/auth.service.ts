import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  public isAuthorized = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if( auth == null )
      {
        this.isAuthorized.next(false);
      }
      else
      {
        this.isAuthorized.next(true);
      }
    });
   }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  recoverPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateProfile(newUsername: string, newPhoto: string) {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: newUsername,
      photoURL: newPhoto
    });
  }

  deleteUser() {
    return this.afAuth.auth.currentUser.delete();
  }

  updateEmail(email: string) {
    return this.afAuth.auth.currentUser.updateEmail(email);
  }

  updatePassword(password: string) {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }

}
