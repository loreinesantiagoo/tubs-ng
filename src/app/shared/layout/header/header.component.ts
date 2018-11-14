import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuTrigger } from '@angular/material';
import { Product } from '../../models/product-model';
import { TubsService } from '../../services/tubs.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  productsArr: Product[];


  constructor(private router: Router,
    private authSvc: AuthService,
    private tubsSvc: TubsService) { }

  ngOnInit() {
  }

  someMethod() {
    this.trigger.openMenu();
  }
  getAllProducts(): void {
    this.tubsSvc.getProducts()
      .subscribe(result => {
        console.log(result);
        this.productsArr = result;
      });
    catchError(err => {
      console.log('caught rethrown error, providing fallback value');
      return of([]);
    });
  }

  navigateToProductsList() {
    this.trigger.openMenu();
    this.getAllProducts();
    this.router.navigate(['/products']);
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
