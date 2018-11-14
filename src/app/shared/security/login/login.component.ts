import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authSvc: AuthService,
    private snackSvc:  MatSnackBar,
    private router: Router) {
      this.loginForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
      });
     }

  ngOnInit() {
  }

  onSubmit() {
    const password = this.loginForm.get('password').value;
    const email = this.loginForm.get('email').value;

    const loginUser: User = {
      email: email,
      password: password
    };
    // first hash to the server side
    if (this.loginForm.valid) {
      this.authSvc.loginWithEmail(loginUser).subscribe((result) => {
        console.log(result);
        const snackBarRef = this.snackSvc.open('Login Successful!', 'Done', {
          duration: 3000
        });
        this.router.navigate(['/products']);
      });
    } else {
      const snackBarRef = this.snackSvc.open('Invalid!', 'Done', {
        duration: 3000
      });
    }
  }

  loginGoogle() {
    this.authSvc.loginWithGoogle();
  }
  loginFacebook() {
    this.authSvc.loginWithFacebook();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
