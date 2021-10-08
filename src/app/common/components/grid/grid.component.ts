import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IFileResponse } from 'src/app/common/model/IFileResponse';
import { ColDef } from 'ag-grid-community';
import { UtilService } from '../../services/util.service';
import { AppConstants } from '../../constants/app-constants';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { cpuUsage } from 'process';
import { IFieldConfig } from '../../model/i-field-config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  @Input()
  pageTitle: string = "";

  @Output()
  error = new EventEmitter<string>();

  @Output()
  success = new EventEmitter<boolean>();

  visibleFields: string[] = [];
  fieldMapper: any = {};
  fieldDetails: any;
  fieldInfo: any;
  defaultColDef: any = {};
  dataLoaded: boolean = false;
  validItems: any[] = [];
  invalidItems: any[] = [];
  

  columnDefs: ColDef[] = [];

  rowData:{ [key: string]: string }[] = [];

  constructor(private utilService: UtilService,
    private apiService: ApiService,
    private excelService: ExcelService) { 
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if(this.jsonLocation) {
      if(!this.fieldDetails) {
        this.utilService.getJSON(
          AppConstants.FILE_PATH_UPLOAD +
          this.jsonLocation + 
          AppConstants.FILE_NAME_FIELD_DETAILS).subscribe(data => {
          this.fieldDetails = data;
         });
      }
      if(!this.fieldInfo) {
        this.utilService.getJSON(
          AppConstants.FILE_PATH_UPLOAD +
          this.jsonLocation + 
          AppConstants.FILE_NAME_FIELD_INFO).subscribe(data => {
          this.fieldInfo = data;
         });
      }

    }
    
    this.bindGridData();

    if(this.isSubmitted) {
      this.postData();
      if(this.invalidItems.length > 0) {
        this.excelService.downloadExcel(this.pageTitle, this.invalidItems, this.fieldInfo.fields, this.fieldDetails);
      }
    }
  }

  bindGridData() {
    let mandatoryFields: string[] = [];
    let lengthConstraints: any = {};
    if(this.gridData.mapperFields && this.gridData.colMapper && this.fieldDetails) {
      
      let fieldLength = this.gridData.mapperFields.length;
      let columnDefs = [];
      
      for(let idx = 0; idx < fieldLength; idx++) {
        let columnKey = this.gridData.mapperFields[idx];
        let columnValue = this.gridData.colMapper[columnKey];
        let fieldConfig: IFieldConfig = this.fieldDetails[columnValue];
        let width = fieldConfig.width;
        if(fieldConfig.required) {
          mandatoryFields.push(columnKey);
        }

        if(fieldConfig.length) {
          lengthConstraints[columnKey] = fieldConfig.length;
        }
        let columnDef: any = {
          "field" : columnKey,
          "headerName": columnValue,
          "width": width,
          "filter": "agTextColumnFilter"
        };

        
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
    }
    
    if(this.gridData.sheetContent) {
      this.rowData = this.gridData.sheetContent;
      
      this.dataLoaded = true;
      this.validateData(mandatoryFields, lengthConstraints);

      console.log("data ", this.rowData);
      
    }
  }

  validateData(mandatoryFields: string[], lengthConstraints: any) {
    
    let mandatoryMissingFieldsIds: string[] = [];
    let validData: any[] = [];
    let inValidData: any[] = [];
    for(let item of this.rowData) {
      let isInvalid = false;
      for(let columnData in item) {
        let length = lengthConstraints[columnData];
        if(length) {
          if(item[columnData].trim().length > length) {
            item["remarks"] = AppConstants.ERR_MSG_INVALID_LENGTH_FIELDS;
            isInvalid = true;
            break;
          }
        }

        if(mandatoryFields.indexOf(columnData) > -1 ) {
          if(!item[columnData]) {
            mandatoryMissingFieldsIds.push(item.sNo);
            item["remarks"] = AppConstants.ERR_MSG_MISSING_MANDATORY_FIELDS;
            isInvalid = true;
            break;
          }        
        }
      }
      if(isInvalid) {
        inValidData.push(item);
      }
      else {
        validData.push(item);
      }
    }
    
    this.validItems = validData;
    this.invalidItems = this.invalidItems;

  }

  getRequestBody() {
    
    let reqData: any[] = [];
    if(this.fieldInfo && this.fieldDetails) {
      if(this.fieldInfo.groups && this.fieldInfo.groups.length > 1) {
        let fieldsByGroup: any = {};
        for(let field of this.fieldInfo.fields) {
          let fieldDetail = this.fieldDetails[field];
          let group = fieldDetail.group;

          let fields = fieldsByGroup[group];

          if(!fields) {
            fields = [];
          }
          fields.push(fieldDetail.name);

          fieldsByGroup[group] = fields;
        }
        let groupData: any = {};
        for(let item of this.validItems) {
          
        for(let group of this.fieldInfo.groups) {
          let fields = fieldsByGroup[group];
          let groupItem: any = {};          
          for(let field of fields) {
            groupItem[field] = item[field];
          }
          let data = groupData[group];
          if(!data) {
            data = [];
          }
          groupItem["itemCode"] = item["itemCode"];
          groupItem["createddate"] = new Date();
          groupItem["updateddate"] = new Date();
          data.push(groupItem);
          groupData[group] = data;
        }
        //reqData.push(groupData);
        
        }
        reqData = groupData;
      }
      else {
        reqData = this.rowData;

        reqData = this.rowData.map((item) => {
          let data: any = item;
          data["createddate"] = new Date();
          data["updateddate"] = new Date();
          return data;
        });
        
      }
    }
    console.log("req data",reqData);
    return reqData;
  }
  
  postData() {
    let reqBody = this.getRequestBody();
    this.apiService.postData(this.apiUrl, reqBody).subscribe(response => {
      this.rowData = [];
      this.success.emit(true);
    });
  }

}
