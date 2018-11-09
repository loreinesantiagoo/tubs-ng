import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, EditProduct } from '../../../shared/models/product-model';
import { Router } from '@angular/router';
import { DialogData } from '../product-detail/product-detail.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: EditProduct[];
  product: Product;
  productsArr: Product[];
  message: string;
  subscription: Subscription;

  constructor(private tubsSvc: TubsService,
    private router: Router,
    private snackSvc: MatSnackBar,
    public dialog: MatDialog,
    private location: Location
    ) { }

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
  onDelete(idValue, productName): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { id: idValue, productName: productName }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (typeof (result) !== 'undefined') {
        this.tubsSvc.deleteProduct(idValue)
          .subscribe(() => {
            this.products = this.products;
            this.goBack();
          });
        const snackBarRef = this.snackSvc.open('Product Deleted', 'Done', {
          duration: 3000
        });
      }
    });
    console.log('deleting product');
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

