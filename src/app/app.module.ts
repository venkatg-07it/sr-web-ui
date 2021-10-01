import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './common/grid/grid.component';
import { ItemMasterCompUploadComponent } from './components/item-master-comp-upload/item-master-comp-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    GridComponent,
    ItemMasterCompUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
