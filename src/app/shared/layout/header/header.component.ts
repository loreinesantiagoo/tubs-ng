import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private authSvc: AuthService) { }

  ngOnInit() {
  }
  navigateToAddProduct() {
    this.router.navigate(['/add-products']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  // navigateToResetPassword() {
  //   this.router.navigate(['/reset-password']);
  // }
  // navigateToChangePassword() {
  //   this.router.navigate(['/change-password']);
  // }
  logout() {
    this.authSvc.logout();
    this.router.navigate(['/products']);
  }
}
