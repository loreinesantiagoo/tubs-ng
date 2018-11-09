import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { TubsService } from 'src/app/shared/services/tubs.service';
// import { MatSnackBar } from '@angular/material';
<<<<<<< HEAD
import { Product } from '../../../shared/models/product-model';
=======
import { Product } from '../../../shared/product-model';
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
import { environment } from 'src/environments/environment.prod';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  uploadAPI = environment.uploadUrl;
  currentUploadURL: string;

  fileUploadQueue: NgForm;
  // renderHtml: String;

  message: string;
  subscription: Subscription;


  newProduct = new FormGroup({
    productName: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.min(1)),
    costPrice: new FormControl('', Validators.min(1)),
    unitPrice: new FormControl('', Validators.min(1))
  });
  get formModel(): any {
    return this.newProduct.get('formModel');
  }
  setValue() { this.newProduct.setValue({ formModel: 'Default text' }); }


  constructor(private tubsSvc: TubsService) { }

  ngOnInit() {
  }

  createProduct() {
    const newProductForm = this.newProduct.get('formModel');
    const productName = this.newProduct.get('productName');
    const quantity = this.newProduct.get('quantity');
    const cost_price = this.newProduct.get('costPrice');
    const unit_price = this.newProduct.get('unitPrice');
    const dateToday = new Date();

    const p: Product = {
      date_added: dateToday,
      productName: productName.value,
      quantity: quantity.value,
      cost_price: cost_price.value,
      unit_price: unit_price.value,
      product_image: this.currentUploadURL
    };
    this.tubsSvc.addProduct(p).subscribe((result) => {

      console.log('Product Added!');
    });
    this.newProduct.reset();
    // this.renderHtml = newProductForm.value;
  }

  doneUpload(evt) {
    console.log(evt.file);
    console.log('>>>' + JSON.stringify(evt.event));
    const evtObj = { ...evt.event };
    console.log('>>>' + evtObj);
    if (typeof (evtObj.body) !== 'undefined') {
      if (typeof (evtObj.body.filename) !== 'undefined') {
        console.log(evtObj.body.filename);
        this.currentUploadURL = evtObj.body.filename;
      }
    }
  }
  removeAfterUpload() {
    this.fileUploadQueue.reset();
  }

}
