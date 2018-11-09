import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { AddProductComponent } from '../../components/products/add-product/add-product.component';
import { ProductDetailComponent } from '../../components/products/product-detail/product-detail.component';
import { SearchPipeComponent } from 'src/app/components/search-pipe/search-pipe.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

import { RegisterComponent } from 'src/app/shared/security/register/register.component';
import { LoginComponent } from 'src/app/shared/security/login/login.component';

import { NoAuthGuard } from '../services/guards/NoAuthGuard';
import { AuthGuardService } from '../services/guards/auth-guard.service';

const route: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },

  { path: 'products', component: ProductListComponent, canActivate: [NoAuthGuard] },
  { path: 'search-product', component: SearchPipeComponent, canActivate: [NoAuthGuard] },

  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuardService] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [NoAuthGuard] },

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
