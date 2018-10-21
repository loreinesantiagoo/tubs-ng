import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

  @Output()
  newProduct: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newProduct = this.fb.group({
      productName: ['', Validators.required],
      quantity: [''],
      costPrice: [''],
      unitPrice: ['']
    });
  }
  createProduct(newProduct) {
    this.newProduct.setValue([]);
    console.log(newProduct);
    // newProduct.value['productName'] =
  }
  onSubmit() {
    // TODO: use eventEmitter with form value
  }
}
