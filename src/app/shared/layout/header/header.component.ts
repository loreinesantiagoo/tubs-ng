import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  constructor(private router: Router,
    private authSvc: AuthService) { }

  ngOnInit() {
  }

  someMethod() {
    this.trigger.openMenu();
  }

  navigateToAddProduct() {
    this.trigger.openMenu();
    this.router.navigate(['/add-products']);
  }
  navigateToRegister() {
    this.trigger.openMenu();
    this.router.navigate(['/register']);
  }
  navigateToLogin() {
    this.trigger.openMenu();
    this.router.navigate(['/login']);
  }
  // navigateToResetPassword() {
  //   this.router.navigate(['/reset-password']);
  // }
  // navigateToChangePassword() {
  //   this.router.navigate(['/change-password']);
  // }
  logout() {
    this.trigger.openMenu();
    this.authSvc.logout();
    this.router.navigate(['/products']);
  }
}
