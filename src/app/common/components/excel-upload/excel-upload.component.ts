import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IFileResponse } from '../../model/IFileResponse';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {
  
  gridData:IFileResponse = {};
  isFileUploaded:boolean = false;
  isSubmitted: boolean = false;
  isModify: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string= "";
  @Input()
  apiUrl: string= "";

  errMsg: string = "";

  constructor() { }

  ngOnInit(): void {
  }
  
  fileResponse(fileResponse:IFileResponse[]) {    
    this.gridData = fileResponse[0];
  }

  fileUploaded(isFileUploaded: boolean) {
    this.isFileUploaded = isFileUploaded;
    this.isSuccess = false;
  }

  optionModify(isModify: boolean) {
    this.isModify = isModify;
  }
  
  onSubmit() {
   this.isSubmitted = true;
  }

  onError(errMsg: string) {
    this.errMsg = errMsg;
    if(errMsg.trim().length > 0) {
      this.isError = true;
    }
  }

  onSuccess(success: boolean) {
    this.isSuccess = true;
  }

  

}
