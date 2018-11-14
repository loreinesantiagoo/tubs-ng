import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './shared/layout/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TubsService } from './shared/services/tubs.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxLocalStorageModule } from 'ngx-localstorage';

// import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { MatFileUploadModule } from '../app/matfileUpload/matFileUpload.module';
import { SearchPipeComponent } from './components/search-pipe/search-pipe.component';
import { AddProductComponent } from '../app/components/products/add-product/add-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/security/login/login.component';
import { RegisterComponent } from './shared/security/register/register.component';
import { AuthInterceptor } from './auth.interceptor';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { UserComponent } from './shared/security/user/user.component';

// const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchPipeComponent,
    AddProductComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ShowAuthedDirective,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxLocalStorageModule.forRoot(),
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    // NgxNewstickerAlbeModule,
    AppRoutingModule,
    MatFileUploadModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
