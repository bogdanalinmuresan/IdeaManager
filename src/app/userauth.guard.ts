import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AuthService } from './services/auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(auth => !auth ? this.router.navigate(['/login']) : true);
  }
}
