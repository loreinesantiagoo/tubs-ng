import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './shared/layout/material.module';
=======
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './shared/material.module';
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TubsService } from './shared/services/tubs.service';
<<<<<<< HEAD
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxLocalStorageModule } from 'ngx-localstorage';

// import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
=======
import { HttpClientModule } from '@angular/common/http';

// import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { MatFileUploadModule } from '../app/matfileUpload/matFileUpload.module';
import { SearchPipeComponent } from './components/search-pipe/search-pipe.component';
import { AddProductComponent } from '../app/components/products/add-product/add-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
<<<<<<< HEAD
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/security/login/login.component';
import { RegisterComponent } from './shared/security/register/register.component';
import { AuthInterceptor } from './auth.interceptor';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ShowAuthedDirective } from './directive/show-authed.directive';

// const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);
=======
import { AlertComponent } from './app/_directives/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    SearchPipeComponent,
    AddProductComponent,
    ProductDetailComponent,
<<<<<<< HEAD
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ShowAuthedDirective
=======
    AlertComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    NgxLocalStorageModule.forRoot(),
=======
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
=======
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
    // NgxNewstickerAlbeModule,
    AppRoutingModule,
    MatFileUploadModule,
  ],
<<<<<<< HEAD
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AngularFirestore],
=======
  providers: [TubsService],
>>>>>>> 78bbaeccf20e64a3f6511741abea31c00a1f58df
  bootstrap: [AppComponent]
})
export class AppModule { }
