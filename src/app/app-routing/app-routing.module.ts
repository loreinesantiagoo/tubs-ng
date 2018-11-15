import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from '../components/products/product-list/product-list.component';
import { AddProductComponent } from '../components/products/add-product/add-product.component';
import { ProductDetailComponent } from '../components/products/product-detail/product-detail.component';
import { SearchPipeComponent } from 'src/app/components/search-pipe/search-pipe.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

import { RegisterComponent } from 'src/app/shared/security/register/register.component';
import { LoginComponent } from 'src/app/shared/security/login/login.component';
import { UserComponent } from '../shared/security/user/user.component';

import { NoAuthGuard } from '../shared/services/guards/NoAuthGuard';
import { AuthGuardService } from '../shared/services/guards/auth-guard.service';
import { AdminGuard } from '../shared/services/guards/admin.guard';
import { CanReadGuard } from '../shared/services/guards/can-read.guard';


const route: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserComponent }, // resolve: { data: UserResolver}

  { path: 'products', component: ProductListComponent },
  { path: 'search-product', component: SearchPipeComponent },

  { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
  { path: 'products/edit/:id', component: ProductDetailComponent, canActivate: [CanReadGuard] },

  { path: '**', component: ProductListComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(route, { enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
