import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    if( formData.valid )
    {
      this.authService.login(formData.value.email, formData.value.password).then((data) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        this.hasError = true;
        this.badPassword = error.code === "auth/wrong-password";
        this.errorMessage = error.message;
      });
    }
    else
    {
      this.hasError = true;
      this.errorMessage = "The form is not correctly filled";
    }
  }

  hasError = false;
  badPassword = false;
  errorMessage = "";

}
