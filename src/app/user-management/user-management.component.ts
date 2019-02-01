import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-approval',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserManagementComponent implements OnInit {

  pendingUsers: Observable<User[]>;
  userList: Observable<User[]>;

  hasError = false;
  errorMessage = "";

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.pendingUsers = this.userService.getPendingUsers();
    this.userList = this.userService.getRegularUsers();
  }

  onUserAccept(uid: string) {

    return this.userService.approveUser(uid, (error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }

    });

  }

  onUserDelete(uid:string) {

    if(confirm("Are you sure you want to delete the user?")) {

      return this.userService.deleteUser(uid, (error) => {

        if(error !== null) {
          this.hasError = true;
          this.errorMessage = error.message;
        }

      });
    }

  }

}
