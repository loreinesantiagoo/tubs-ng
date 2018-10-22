import { Component, OnInit, ViewChild, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TubsService } from 'src/app/shared/services/tubs.service';
// import { MatSnackBar } from '@angular/material';
import { Product } from '../../../shared/model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  uploadAPI = environment.uploadUrl;
  currentUploadURL: string;

  renderHtml: String;

  newProduct = new FormGroup({
    productName: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    costPrice: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required)
  });
  get formModel(): any {
    return this.newProduct.get('formModel');
  }
  setValue() { this.newProduct.setValue({ formModel: 'Default text' }); }

  constructor(private tubsSvc: TubsService) { }

  ngOnInit() {
    this.createProduct();
  }

  createProduct() {
    const newProductForm = this.newProduct.get('formModel');
    const productName = this.newProduct.get('productName');
    const quantity = this.newProduct.get('quantity');
    const cost_price = this.newProduct.get('costPrice');
    const unit_price = this.newProduct.get('unitPrice');
    const dateToday = new Date();
  // console.log({ ... productName});
    const p: Product = {
      date_added: dateToday,
      productId: '',
      productName: productName.value,
      quantity: quantity.value,
      cost_price: cost_price.value,
      unit_price: unit_price.value,
      product_image: this.currentUploadURL
    };
    this.tubsSvc.saveProduct(p).subscribe((result) => {
      console.log('snack bar!');
      // const snackBarRef = this.snackBar.open('Product Added');
    });
    // console.log(newProductForm.value);
    // this.renderHtml = newProductForm.value;
  }

  doneUpload(evt) {
    // console.log(evt.file);
    // console.log('>>>' + JSON.stringify(evt.event));
    // const evtObj = {... evt.event};
    // console.log('>>>' + evtObj);
    // if (typeof(evtObj.body) !== 'undefined') {
    //   if (typeof(evtObj.body.filename) !== 'undefined') {
    //     console.log(evtObj.body.filename);
    //     this.currentUploadURL = evtObj.body.filename;
    //   }
    // }
  }

  ngOnDestroy() {

  }
}
