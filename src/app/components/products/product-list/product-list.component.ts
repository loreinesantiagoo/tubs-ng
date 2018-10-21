import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productName: string;
  products = ['tubs bidet seat-D', 'tubs bidet seat-O', 'tubs bidet seat-V'];

  allProducts = this.products[0];
  constructor() { }

  ngOnInit() {
  }

}
