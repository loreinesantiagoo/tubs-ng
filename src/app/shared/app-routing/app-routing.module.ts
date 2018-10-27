import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { AddProductComponent } from '../../components/products/add-product/add-product.component';
import { ProductDetailComponent } from '../../components/products/product-detail/product-detail.component';
import { SearchPipeComponent } from 'src/app/components/search-pipe/search-pipe.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

const route: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'search-product', component: SearchPipeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
