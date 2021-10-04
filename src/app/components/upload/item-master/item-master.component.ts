import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/common/services/util.service';
import { AppConstants } from './../../../common/constants/app-constants';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {

  @Input()
  jsonLocation: string = "";

  fieldInfo:any;
  fieldDetails: any;
  pageTitle:string = AppConstants.PAGE_TITLE_ITEM_MASTER_UPLOAD;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(!this.fieldInfo) {
      this.utilService.getJSON(this.jsonLocation + AppConstants.FILE_NAME_FIELD_INFO).subscribe(data => {
        this.fieldInfo = data;
       });
    }
    if(!this.fieldDetails) {
      this.utilService.getJSON(this.jsonLocation + AppConstants.FILE_NAME_FIELD_DETAILS).subscribe(data => {
        this.fieldDetails = data;
       });
    }
  }

  onSubmit(data: any) {
    let dataByGroups: any = [];


    if(this.fieldDetails && this.fieldInfo) {
      let fieldsByGroup: any = {};
      let mandatoryFields: string[] = [];
      let missingFieldIds: string[] = [];

      for(let field of this.fieldInfo.fields) {
        let fieldDetail = this.fieldDetails[field];
        let group = fieldDetail.group;
        let mandatory = fieldDetail.mandatory;

        let fields = fieldsByGroup[group];

        if(mandatory) {
          mandatoryFields.push(fieldDetail.field);
        }

        if(!fields) {
          fields = [];
        }
        fields.push(fieldDetail.field);

        fieldsByGroup[group] = fields;
      }
      
      for(let item of data) {
        let groupData: any = {};
        for(let group of this.fieldInfo.groups) {
          let fields = fieldsByGroup[group];
          let groupItem: any = {};          
          for(let field of fields) {
            if(mandatoryFields.indexOf(field) > -1) {
              if(!item[field]) {
                missingFieldIds.push(item.sNo);
              }
            }
            groupItem[field] = item[field];
          }
          groupData[group] = groupItem;
        }
        dataByGroups.push(groupData);
      }
      
    }

    
    
    
  }

}
