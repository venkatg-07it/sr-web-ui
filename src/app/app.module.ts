import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './common/components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './common/components/grid/grid.component';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ExcelUploadComponent } from './common/components/excel-upload/excel-upload.component';
import { ItemMasterComponent } from './components/upload/item-master/item-master.component';
import { ErrorMessageComponent } from './common/components/error-message/error-message.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { AeItemMasterComponent } from './components/add-edit/ae-item-master/ae-item-master.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { TextBoxComponent } from './common/components/text-box/text-box.component';
import { DynamicFormComponent } from './common/components/dynamic-form/dynamic-form.component';
import { AeCustomerMasterComponent } from './components/add-edit/ae-customer-master/ae-customer-master.component';
import { CustomerMasterComponent } from './components/upload/customer-master/customer-master.component';
import { ComponentMasterComponent } from './components/upload/component-master/component-master.component';
import { AeComponentMasterComponent } from './components/add-edit/ae-component-master/ae-component-master.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { EeItemMasterComponent } from './components/excel-export/ee-item-master/ee-item-master.component';
import { EeCustomerMasterComponent } from './components/excel-export/ee-customer-master/ee-customer-master.component';
import { EeComponentMasterComponent } from './components/excel-export/ee-component-master/ee-component-master.component';
import { GridViewComponent } from './common/components/grid-view/grid-view.component';
import { AssemblyMasterComponent } from './components/upload/assembly-master/assembly-master.component';
import { EeAssemblyMasterComponent } from './components/excel-export/ee-assembly-master/ee-assembly-master.component';
import { AeAssemblyMasterComponent } from './components/add-edit/ae-assembly-master/ae-assembly-master.component';
import { ImRawMatMasterComponent } from './components/upload/im-raw-mat-master/im-raw-mat-master.component';
import { EeImRawMatMasterComponent } from './components/excel-export/ee-im-raw-mat-master/ee-im-raw-mat-master.component';
import { AeImRawMatMasterComponent } from './components/add-edit/ae-im-raw-mat-master/ae-im-raw-mat-master.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    GridComponent,
    ExcelUploadComponent,
    ItemMasterComponent,
    ErrorMessageComponent,
    HomeComponent,
    UploadComponent,
    AeItemMasterComponent,
    AddEditComponent,
    TextBoxComponent,
    DynamicFormComponent,
    AeCustomerMasterComponent,
    CustomerMasterComponent,
    ComponentMasterComponent,
    AeComponentMasterComponent,
    ExcelExportComponent,
    EeItemMasterComponent,
    EeCustomerMasterComponent,
    EeComponentMasterComponent,
    GridViewComponent,
    AssemblyMasterComponent,
    EeAssemblyMasterComponent,
    AeAssemblyMasterComponent,
    ImRawMatMasterComponent,
    EeImRawMatMasterComponent,
    AeImRawMatMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
