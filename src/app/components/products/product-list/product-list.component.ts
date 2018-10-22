import { Component, OnInit, OnDestroy } from '@angular/core';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../../shared/model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productsArr: Product[];
  message: string;
  subscription: Subscription;

  constructor(private tubsSvc: TubsService) { }

  ngOnInit() {
    this.getAllProducts();
    this.subscription = this.tubsSvc.getProducts()
      .subscribe((message: string) => this.message = message);
  }
  getAllProducts() {
    const P = this.tubsSvc.getProducts();
    P
      .subscribe(result => {
        console.log(result);
        this.productsArr = result;
      });
    // .pipe(
    // map(res => res['payload']),
    // catchError(err => {
    //   console.log('caught mapping error and rethrowing', err);
    //   return throwError(err);
    // }),
    catchError(err => {
      console.log('caught rethrown error, providing fallback value');
      return of([]);
    });
    // );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

