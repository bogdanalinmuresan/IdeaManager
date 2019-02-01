import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";

@Injectable()
export class ManagerAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {

    return this.authService.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(auth => !auth || !this.userService.user.Manager ? this.router.navigate(['/']) : true);
  }
}
