import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from '../components/products/product-list/product-list.component';
import { AddProductComponent } from '../components/products/add-product/add-product.component';
import { ProductDetailComponent } from '../components/products/product-detail/product-detail.component';
import { SearchPipeComponent } from 'src/app/components/search-pipe/search-pipe.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LoginComponent } from 'src/app/shared/security/login/login.component';
import { RegisterComponent } from 'src/app/shared/security/register/register.component';
import { AuthGuardService } from '../shared/services/guards/auth-guard.service';
import { NoAuthGuard } from '../shared/services/guards/NoAuthGuard';

const route: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'search-product', component: SearchPipeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  // { path: 'user', component: UserComponent, resolve: {dataResolver} }
  // { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
