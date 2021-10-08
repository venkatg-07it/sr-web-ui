import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FORMERR } from 'dns';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  @Input()
  apiUrl: string = "";
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string = "";

  gridData: any[] = [];
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  fieldDatails: any = {};
  fieldInfo: any = {};
  
  constructor(private apiService: ApiService,
    private utilService: UtilService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.gridData.length == 0){
      this.apiService.getData(this.apiUrl).subscribe((response) => {
        if(this.apiUrl.toLowerCase().indexOf("itemmaster") > -1 &&
        !(this.apiUrl.toLowerCase().indexOf("itemmasterrm") > -1)) {
          let keys = Object.keys(response);
          let datas =  response[keys[0]];
          let length = datas.length;
          let gridData = [];
          for(let idx = 0; idx < length; idx++) {
            let result:any = {};
            for(let key of keys) {
              let item = response[key][idx];
              for(let itemKey in item) {
                result[itemKey] = item[itemKey];
              }
            }
            gridData.push(result);
          }
          this.gridData = gridData;
        }
        else {
          this.gridData = response;
        }
        
      })
    }

    if(this.jsonLocation) {
      let requests: Observable<any>[] = [];
      let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
                          this.jsonLocation + 
                          AppConstants.FILE_NAME_FIELD_INFO;
      let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
                          this.jsonLocation + 
                          AppConstants.FILE_NAME_FIELD_DETAILS;

      requests.push(this.apiService.getData(fieldInfoUrl));
      requests.push(this.apiService.getData(fieldDetailsUrl));
      
      this.utilService.getBulkAsyncData(requests).subscribe(responses => {
        let fieldInfo = responses[0];
        let fieldDetails = responses[1];
        let columnDefs = [];
        for(let field of fieldInfo.fields) {
          let fieldConfig: IFieldConfig = fieldDetails[field];
          let columnDef: any = {
            field: fieldConfig.name,
            headerName: fieldConfig.label,
            width: fieldConfig.width
          }
          if(fieldConfig.pinned) {
            columnDef["pinned"] = true;
          }
          columnDefs.push(columnDef);
        }
        this.defaultColDef = {
          width: 150,        
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          resizable: true,
        };

        this.columnDefs = columnDefs;
        this.fieldDatails = fieldDetails;
        this.fieldInfo = fieldInfo;

      });
    }
  }

  export() {
    this.excelService.downloadExcel("CUSTOMER-MASTER-EXPORT", this.gridData, this.fieldInfo.fields, this.fieldDatails );
  }
}
