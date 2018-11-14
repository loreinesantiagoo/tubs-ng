import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, EditProduct } from '../../../shared/models/product-model';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogData } from '../product-detail/product-detail.component';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  product: EditProduct[];

  products$: Observable<Product[]>;
  productsArr: Product[];
  productSortOrder: boolean;

  message: string;
  subscription: Subscription;

  constructor(private tubsSvc: TubsService,
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private snackSvc: MatSnackBar,
    public dialog: MatDialog,
    private location: Location
  ) {
    // this.route.params.subscribe(params => {
    //   console.log('PARAMS' + params);
    //   console.log('RESET ID' + params.resetId);
    //   if (typeof (params.resetId) !== 'undefined') {
    //     this.authSvc.isResetIdValid(params.resetId).subscribe((result) => {
    //       console.log(result);
    //       if (result.exist) {
    //         this.router.navigate([`/resetChangePassword/${params.resetId}`]);
    //       } else {
    //         this.router.navigate(['/products']);
    //       }
    //     });
    //   } else {
    //     this.router.navigate(['/products']);
    //   }
    // });
  }

  ngOnInit() {
    this.getAllProducts();
    this.subscription = this.tubsSvc.getProducts()
      .subscribe((message) => message);

  }
  getAllProducts(): void {
    this.tubsSvc.getProducts()
      .subscribe(result => {
        console.log(result);
        this.productsArr = result;
        // this.sortProduct(p => p.date_added, 'DESC');
      });
    catchError(err => {
      console.log('caught rethrown error, providing fallback value');
      return of([]);
    });
  }

  sortProduct<T>(prop: (c: Product) => T, order: 'ASC' | 'DESC'): void {
    this.productsArr.sort((a, b) => {
      if (prop(a) < prop(b)) {
        return -1;
      }
      if (prop(a) > prop(b)) {
        return 1;
      }
      return 0;
    });
    if (order === 'DESC') {
      this.productsArr.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }
  onEdit(idValue) {
    console.log(idValue);
    this.router.navigate([`/products/${idValue}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'product-delete-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

