import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, Roles } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { Router, ResolveStart } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  loginForm: FormGroup;
  roles: Roles;
  constructor(private fb: FormBuilder,
    public authSvc: AuthService,
    private snackSvc: MatSnackBar,
    private router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const loginUser: User = {
      email: email,
      password: password,
      roles: this.roles
    };

    if (this.loginForm.valid) {
      this.authSvc.loginWithEmail(loginUser).subscribe((result) => {
        console.log(result);
        const snackBarRef = this.snackSvc.open('Login Successful!', 'Done', {
          duration: 3000
        });
        this.authSvc.setFirebaseTokenToLocalstorage();
        this.router.navigate(['/users']);
      });
    } else {
      const snackBarRef = this.snackSvc.open('Please Login!', 'Done', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    }
  }

  loginGoogle() {
    this.authSvc.loginWithGoogle();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToResetPass() {
    this.router.navigate(['/resetPassword']);
  }
}
