import { Component, OnInit, EventEmitter, Output, Input, ElementRef, Inject } from '@angular/core';
import { EditProduct, Product } from '../../../shared/models/product-model';
import { TubsService } from 'src/app/shared/services/tubs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

export interface DialogData {
  Id: string;
  productName: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products: EditProduct[];
  product: Product;
  user: User;
  message: string;
  subscription: Subscription;


  existingProductForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    costPrice: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required)
  });
  get formModel(): any {
    return this.existingProductForm.get('formModel');
  }
  setValue() {
    this.existingProductForm.patchValue({ formModel: this.product });
    console.log('setVlaue');
  }


  constructor(private tubsSvc: TubsService,
    private authSvc: AuthService,
    public dialog: MatDialog,
    private snackSvc: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location, private el: ElementRef) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => this.user = user);
    this.getOneProductById();
    this.subscription = this.tubsSvc.getProducts()
      .subscribe((message: any) => this.message = message);
  }

  getOneProductById() {
    const Id = this.route.snapshot.params.id;
    console.log(Id, this.existingProductForm);
    return this.tubsSvc.getProductById(Id)
      .subscribe((result) => {
        console.log(result);
        this.existingProductForm.patchValue({
          id: result.Id,
          // productName: result.productName,
          // quantity: result.quantity,
          // costPrice: result.cost_price,
          // unitPrice: result.unit_price,
          // product_image: result.product_image
        });
        this.product = result;
      });
  }

  updateP(idValue): void {
    console.log(idValue);
    if (this.authSvc.canEdit(this.user)) {
      this.router.navigate([`/products/${idValue}`]);
      const productObj: EditProduct = {
        id: this.product.id,
        date_edited: new Date(),
        productName: this.existingProductForm.get('productName').value,
        quantity: this.existingProductForm.get('quantity').value,
        cost_price: this.existingProductForm.get('cost_price').value,
        unit_price: this.existingProductForm.get('unit_price').value,
        product_image: this.existingProductForm.get('product_image').value
      };
      this.tubsSvc.updateProduct(idValue).subscribe((result) => {
        const snackBarRef = this.snackSvc.open('Product Updated', 'Done', { duration: 3000 });
        console.log('snack bar!');
        this.goBack();
      });
      console.log('updating product');
    } else {
      console.error('you are not allowed to do that!');
    }

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
