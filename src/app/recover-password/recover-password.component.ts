import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css', '../login/login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverPasswordComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    if(formData.valid)
    {
      this.authService.recoverPassword(formData.value.email).then( _ => {
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.hasError = true;
        this.errorMessage = error.message;
      });
    }
  }

}
