import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { IFileResponse } from './model/IFileResponse';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  

  gridData:IFileResponse = {};

  fileResponse(fileResponse:IFileResponse[]) {
    console.log("success", fileResponse);
    this.gridData = fileResponse[0];
  }
  
  ngOnChanges(changes: IFileResponse): void {
    console.log("called here.... changes");
  }
}
