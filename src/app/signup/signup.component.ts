import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  hasError = false;
  errorMessage = "";


  onSubmit(formData: NgForm) {
    if(formData.valid)
    {
      this.authService.createUser(formData.value.email, formData.value.password).then((user) => {
        // User created, add details
        user.updateProfile({
          displayName: formData.value.name
        });
        this.userService.createUser(user.uid, formData.value.name, formData.value.email);
      }).then( () => {
        // Success
        this.router.navigate(['/']);
      }).catch( (err) => {
        // Handle errors
        this.hasError = true;
        this.errorMessage = err.message;
      });
    }
  }
}
