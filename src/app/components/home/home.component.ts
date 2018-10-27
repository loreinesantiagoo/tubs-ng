import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TubsService } from '../../shared/services/tubs.service';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = ProductListComponent;
  ourProducts = 'Our Products';

  constructor(private tubsSvc: TubsService,
    private route: Router, private alertSvc: AlertService) { }

  ngOnInit() {

  }
  success(message: string) {
    this.alertSvc.success(message);
  }

  error(message: string) {
    this.alertSvc.error(message);
  }

  // info(message: string) {
  //     this.alertSvc.info(message);
  // }

  // warn(message: string) {
  //     this.alertSvc.warn(message);
  // }

  clear() {
    this.alertSvc.clear();
  }
}
