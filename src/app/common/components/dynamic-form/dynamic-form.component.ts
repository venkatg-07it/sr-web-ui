import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  loadForm: boolean = false;
  isModify: boolean = false;
  searchText: string = "";

  form: FormGroup = new FormGroup({});
  formGroups: any = {};
  formNames: string[] = [];
  groupInfo: any = {};
  formGroupDisplayName: any = AppConstants.FORM_GROUP_TITLES;
  isSuccess: boolean = false;

  constructor(private apiService: ApiService, private utilService: UtilService) { }

 

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
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

      let groupInfo: any = {};
      let formGroupInfo: any = {};
      let formGroups: any = {};
      let groupNames: string[] = [];

      for(let field of fieldInfo.fields) {
        let fieldConfig:IFieldConfig = fieldDetails[field];
        let group = fieldConfig.group;
        let rowNo = fieldConfig.row;

        if(group) {
          let groupObj = groupInfo[group];
          let formGroup = formGroupInfo[group];

          if(!groupObj) {
            groupObj = {
              rowInfo: {},
              rowIds: []
            }
            
            formGroup = {};
            groupNames.push(group);
                
          }

          if(rowNo) {
            let rowKey = "row" + rowNo;
            let fields = groupObj.rowInfo[rowKey];
            if(!fields) {
              fields = [];
              groupObj.rowIds.push(rowKey);
            }
            fields.push(fieldConfig);
            let validators:ValidatorFn[] = [];
            if(fieldConfig.required){
              validators.push(Validators.required);
            }
            if(fieldConfig.length) {
              validators.push(Validators.maxLength(fieldConfig.length));
            }
            formGroup[fieldConfig.name] = new FormControl('', validators);
            
            
            groupObj.rowInfo[rowKey] = fields;
            formGroupInfo[group] = formGroup;
          }
          groupInfo[group] = groupObj;
          formGroups[group] = formGroup;
        }
      }
      this.formNames = groupNames;

      for(let group of groupNames) {
        let formGroup = formGroupInfo[group];
        this.formGroups[group] = new FormGroup(formGroup);
      }
      this.groupInfo = groupInfo;

      console.log("group info", this.groupInfo, this.formGroups);

    });
  }

  loadEditForm() {
    this.apiService.getData(this.searchUrl + this.searchText).subscribe((response) => {
      if(response) {
        for(let group of this.formNames) {
          let form = this.formGroups[group];
          form.patchValue(response[group]);
        }
        this.loadForm = true;
      }
    });
    
    
  }

  submit() {

    let request: any = {};
    if(this.formNames.length == 1) {
      let form: FormGroup = this.formGroups[this.formNames[0]];
      request = form.value;
      request["createddate"] = new Date();
      request["updateddate"] = new Date();
    }
    else {
      let itemForm = this.formGroups["itemMaster"];
      let itemCode = itemForm.value["itemCode"];
      debugger;
      
      for(let group of this.formNames) {
        let form: FormGroup = this.formGroups[group];
        let data = form.value;

        data["createddate"] = new Date();
        data["updateddate"] = new Date();
        data["itemCode"] = itemCode;
        request[group] = [data];
      }
    }
    
    console.log(request);
    console.log(JSON.stringify(request));
    this.apiService.postData(this.apiUrl, [request]).subscribe(response => {
      this.isSuccess = true;
      if(response) {
        if(this.formNames.length == 1) {
          let form: FormGroup = this.formGroups[this.formNames[0]];
          request = form.reset();
        }
        else {
          for(let group of this.formNames) {
            let form: FormGroup = this.formGroups[group];
            request[group] = form.reset();
          }
        }
      }
    });
    
  }
}
