import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TubsService } from '../../shared/services/tubs.service';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
products = ProductListComponent;
ourProducts = 'Our Products';

  constructor(private tubsSvc: TubsService,
              private route: Router) { }

  ngOnInit() {

  }

}
