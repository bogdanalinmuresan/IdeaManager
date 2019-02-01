import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  private user = new User;
  hasError = false;
  hasChanged = false;
  errorMessage = "";
  hasUpdateProfile = false;
  hasProfileError = false;
  errorMessageProfile = "";
  hasUpdateEmail = false;
  hasEmailError = false;
  errorMessageEmail = "";
  hasUpdatePassword = false;
  hasPasswordError = false;
  errorMessagePassword = "";

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {
    this.userService.currentUser.subscribe((user) => {
      if( user != null )
      {
        this.user = user;
      }
      else
      {
        this.user = null;
      }
    })
   }

  ngOnInit() {
  }

  onSubmitPersonal(formData: NgForm) {
    this.hasUpdateProfile = false;
    this.hasProfileError = false;
    this.hasUpdateEmail = false;
    this.hasEmailError = false;
    this.hasChanged = false;
    this.hasError = false;
    if( formData.valid ) {
      let v = formData.value;
      this.authService.updateProfile(v.name, null).then((data) => {
        this.hasUpdateProfile = true;
      }).catch((error) => {
        this.hasProfileError = true;
        this.errorMessageProfile = error.message;
      }); //TODO check what to do with the user.photo
      this.authService.updateEmail(v.email).then((data) => {
        this.hasUpdateEmail = true;
        if (!this.hasProfileError) { //Only update when no errors
          this.userService.updateUser(this.user.id, v.name, v.email).then((data) => {
            this.hasChanged = true;
            this.user.Name = v.name;
            this.user.Email = v.email;
          }).catch((error) => {
            this.hasError = true;
            this.errorMessage = error.message;
          });
        }
      }).catch((error) => {
        this.hasEmailError = true;
        this.errorMessageEmail = error.message;
      });
    }
  }

  onSubmitPassword(formData: NgForm) {
    this.hasUpdatePassword = false;
    this.hasPasswordError = false;
    if( formData.valid ) {
      let v = formData.value;
      //check old password
      this.authService.login(this.user.Email, v.old).then((data) => {
        if (v.new1 == v.new2) {
          this.authService.updatePassword(v.new1).then((data) => {
            this.hasUpdatePassword = true;
          }).catch((error) => {
            this.hasPasswordError = true;
            this.errorMessagePassword = error.message;
          });
        } else {
          this.hasPasswordError = true;
          this.errorMessagePassword = "Passwords didn't match, please check again";
        }
      }).catch((error) => {
        this.hasPasswordError = true;
        this.errorMessagePassword = "The current password is incorrect";
      });
    }
  }

  onDeleteAccount() {

    if(confirm("Do you really want to delete your account?")) {

      this.authService.deleteUser().catch(error => {
        this.hasError = true;
        this.errorMessage = error.message;
      }).then(() => {
        this.userService.deleteUser(this.user.id).catch(error => {
          this.hasError = true;
          this.errorMessage = error.message;
        }).then(() => this.router.navigate(['/']));
      });
    }

  }
}
