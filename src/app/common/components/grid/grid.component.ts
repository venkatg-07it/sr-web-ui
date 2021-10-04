import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IFileResponse } from 'src/app/common/model/IFileResponse';
import { ColDef } from 'ag-grid-community';
import { UtilService } from '../../services/util.service';
import { AppConstants } from '../../constants/app-constants';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input()
  gridData: IFileResponse = {};

  @Input()
  compName: string = "";

  @Input()
  isFileUploaded: Boolean = false;

  @Input()
  isModify: Boolean = false;

  @Input()
  jsonLocation: string = "";

  @Input()
  isSubmitted: boolean = false;

  @Input()
  apiUrl: string = "";

  @Output()
  error = new EventEmitter<string>();

  visibleFields: string[] = [];
  fieldMapper: any = {};
  fieldDetails: any;
  fieldInfo: any;
  defaultColDef: any = {};
  dataLoaded: boolean = false;
  

  columnDefs: ColDef[] = [];

  rowData:{ [key: string]: string }[] = [];

  constructor(private utilService: UtilService,
    private apiService: ApiService) { 
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if(this.jsonLocation) {
      if(!this.fieldDetails) {
        this.utilService.getJSON(this.jsonLocation + AppConstants.FILE_NAME_FIELD_DETAILS).subscribe(data => {
          this.fieldDetails = data;
         });
      }
      if(!this.fieldInfo) {
        this.utilService.getJSON(this.jsonLocation + AppConstants.FILE_NAME_FIELD_INFO).subscribe(data => {
          this.fieldInfo = data;
         });
      }

    }
    
    this.bindGridData();

    if(this.isSubmitted) {
      
    }
  }

  bindGridData() {
    let mandatoryFields: string[] = [];
    if(this.gridData.mapperFields && this.gridData.colMapper && this.fieldDetails) {
      
      let fieldLength = this.gridData.mapperFields.length;
      let columnDefs = [];
      
      for(let idx = 0; idx < fieldLength; idx++) {
        let columnKey = this.gridData.mapperFields[idx];
        let columnValue = this.gridData.colMapper[columnKey];
        let width = this.fieldDetails[columnValue]["width"];
        if(this.fieldDetails[columnValue]["mandatory"]) {
          mandatoryFields.push(columnKey);
        }
        let columnDef: any = {
          "field" : columnKey,
          "headerName": columnValue,
          "width": width,
          "filter": "agTextColumnFilter"
        };
        if(this.fieldDetails[columnValue]["pinned"]) {
          columnDef["pinned"] = this.fieldDetails[columnValue]["pinned"];
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
    }
    
    if(this.gridData.sheetContent) {
      this.rowData = this.gridData.sheetContent;
      
      this.dataLoaded = true;
      this.validateData(mandatoryFields);
    }
  }

  validateData(mandatoryFields: string[]) {
    
    let mandatoryMissingFieldsIds: string[] = [];

    for(let item of this.rowData) {
      for(let columnData in item) {
        if(mandatoryFields.indexOf(columnData) > -1 ) {
          mandatoryMissingFieldsIds.push(item.sNo);
          break;
        }
      }
    }
    if(mandatoryMissingFieldsIds.length > 0) {
      let errMsg = '';
      let arrLenth = mandatoryMissingFieldsIds.length;
      if( arrLenth > 50) {
        errMsg = mandatoryMissingFieldsIds.slice(0, 50).join(',') + '...' + mandatoryMissingFieldsIds[arrLenth - 1];
      }
      else {
        errMsg = mandatoryMissingFieldsIds.join(',');
      }
      this.error.emit(AppConstants.ERR_MSG_MISSING_MANDATORY_FIELDS + errMsg);
    }

  }

  getRequestBody() {
    let requestBody: any = {};
    let reqData: any[] = [];
    if(this.fieldInfo && this.fieldDetails) {
      if(this.fieldInfo.groups && this.fieldInfo.groups.length > 0) {
        let fieldsByGroup: any = {};
        for(let field of this.fieldInfo.fields) {
          let fieldDetail = this.fieldDetails[field];
          let group = fieldDetail.group;

          let fields = fieldsByGroup[group];

          if(!fields) {
            fields = [];
          }
          fields.push(fieldDetail.field);

          fieldsByGroup[group] = fields;
        }
        for(let item of this.rowData) {
          let groupData: any = {};
        for(let group of this.fieldInfo.groups) {
          let fields = fieldsByGroup[group];
          let groupItem: any = {};          
          for(let field of fields) {
            groupItem[field] = item[field];
          }
          groupData[group] = groupItem;
        }
        reqData.push(groupData);
        }
      }
      else {
        reqData = this.rowData;
      }
    }
    requestBody["data"] = reqData;
    return requestBody;
  }
  
  postData() {
    let reqBody = this.getRequestBody();
    this.apiService.postData(this.apiUrl, reqBody).subscribe(response => {
      console.log("success");
    });
  }

}
