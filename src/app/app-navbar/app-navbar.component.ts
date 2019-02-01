import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../user";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {

  user: User;
  public isLoggedIn: boolean;
  public isManager: boolean;
  public isApproved: boolean;

  searchTerm: string = "";

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {
    this.user = new User;
    this.authService.isAuthorized.subscribe((isAuth) => this.isLoggedIn = isAuth);
    this.userService.currentUser.subscribe((user) => {
      if(user!==null)
      {
        this.user = user;
        this.isManager = user.Manager;
        this.isApproved = user.Approved;
      }
      else
      {
        this.user = null;
        this.isApproved = false;
        this.isManager = false;
      }
    })
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
