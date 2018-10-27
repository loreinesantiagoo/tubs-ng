import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TubsService } from './shared/services/tubs.service';
import { HttpClientModule } from '@angular/common/http';

// import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { MatFileUploadModule } from '../app/matfileUpload/matFileUpload.module';
import { SearchPipeComponent } from './components/search-pipe/search-pipe.component';
import { AddProductComponent } from '../app/components/products/add-product/add-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { AlertComponent } from './app/_directives/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    SearchPipeComponent,
    AddProductComponent,
    ProductDetailComponent,
    AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxNewstickerAlbeModule,
    AppRoutingModule,
    MatFileUploadModule,
  ],
  providers: [TubsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
