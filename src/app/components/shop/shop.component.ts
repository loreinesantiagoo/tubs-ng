import { Component, OnInit } from '@angular/core';
import { TubsService } from '../../shared/services/tubs.service';
import { ProductsConfig } from '../../shared/model';
import { Config } from 'protractor';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  config: Config;

  httpHeaders: string[];

  private results = [];

  constructor(private tubsSvc: TubsService) { }

  ngOnInit() {
    showProducts() {
      this.tubsSvc.getAllProducts()
        .subscribe(
          (data: ProductsConfig) => this.config = { ...data },
          error => error // error path
        );
      // showConfigResponse() {
      //   this.tubsSvc.getConfigResponse()
      //     // resp is of type `HttpResponse<Config>`
      //     .subscribe(resp => {
      //       // display its headers
      //       const keys = resp.headers.keys();
      //       this.httpHeaders = keys.map(key =>
      //         `${key}: ${resp.headers.get(key)}`);

      //       // access the body directly, which is typed as `Config`.
      //       this.config = { ...resp.body };
      //     });
      // }


    }
  }
}
