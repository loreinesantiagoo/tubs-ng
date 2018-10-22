import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TubsService } from './shared/services/tubs.service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

// import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductEditorComponent } from './components/products/product-editor/product-editor.component';
import { MatFileUploadModule } from '../app/matfileUpload/matFileUpload.module';
import { SearchPipeComponent } from './components/search-pipe/search-pipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductEditorComponent,
    SearchPipeComponent
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
