import { Component, OnInit } from '@angular/core';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { Product } from '../../.././shared/model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productName: string;
  productsArr: Product[];

  constructor(private tubsSvc: TubsService) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    const P = this.tubsSvc.getProducts();
      P
      .subscribe(result => {
        console.log(result);
        this.productsArr = result;
      }),
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
}

