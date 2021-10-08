import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item-master-upload', component: UploadComponent },
  { path: 'customer-master-upload', component: UploadComponent },
  { path: 'component-master-upload', component: UploadComponent },
  { path: 'assembly-master-upload', component: UploadComponent },
  { path: 'im-raw-materials-master-upload', component: UploadComponent },
  { path: 'item-master', component: AddEditComponent },  
  { path: 'customer-master', component: AddEditComponent },
  { path: 'component-master', component: AddEditComponent },
  { path: 'assembly-master', component: AddEditComponent },
  { path: 'im-raw-materials-master', component: AddEditComponent },
  { path: 'item-master-export', component:  ExcelExportComponent },
  { path: 'customer-master-export', component:  ExcelExportComponent },
  { path: 'component-master-export', component:  ExcelExportComponent },
  { path: 'assembly-master-export', component:  ExcelExportComponent },
  { path: 'im-raw-materials-master-export', component:  ExcelExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
