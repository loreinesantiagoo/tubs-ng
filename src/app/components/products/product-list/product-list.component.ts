import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../../shared/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  product: Product;
  productsArr: Product[];
  message: string;
  subscription: Subscription;

  constructor(private tubsSvc: TubsService, private router: Router,
    private snackSvc: MatSnackBar) { }

  ngOnInit() {
    this.getAllProducts();
    this.subscription = this.tubsSvc.getProducts()
      .subscribe((message) => message );

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
  onEdit(idValue) {
    console.log(idValue);
    this.router.navigate([`/products/${idValue}`]);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

