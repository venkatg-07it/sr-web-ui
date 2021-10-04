import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './common/components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './common/components/grid/grid.component';
import { ItemMasterCompUploadComponent } from './components/item-master-comp-upload/item-master-comp-upload.component';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms'

import { ExcelUploadComponent } from './common/components/excel-upload/excel-upload.component';
import { ItemMasterComponent } from './components/upload/item-master/item-master.component';
import { ErrorMessageComponent } from './common/components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    GridComponent,
    ItemMasterCompUploadComponent,
    ExcelUploadComponent,
    ItemMasterComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
