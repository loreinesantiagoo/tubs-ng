import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string;
  resetPassForm: FormGroup;

  constructor(private authSvc: AuthService,
    private router: Router,
    private snackSvc: MatSnackBar) {
    this.resetPassForm = new FormGroup({
      email: new FormControl(''),
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    const email = this.resetPassForm.get('email').value;

    if (this.resetPassForm.valid) {
      this.authSvc.resetPassword(email);
      console.log('email sent to', email);
      const snackBarRef = this.snackSvc.open('Please check your email!', 'Done', {
        duration: 3000
      }); this.router.navigate(['/login']);
    } else {
      const snackBarRef = this.snackSvc.open('Make sure the email is correct!', 'Done', {
        duration: 3000
      });
    }
  }
}
