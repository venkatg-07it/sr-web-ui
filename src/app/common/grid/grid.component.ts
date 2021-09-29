import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { IFileResponse } from 'src/app/model/IFileResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input()
  gridData: IFileResponse = {};

  @Input()
  compName: string = "";

  visibleFields: string[] = [];
  fieldMapper: any = {};

  private _jsonURL = './../../../assets/json/config.json';
  private _jsonFiedMapperURL = './../../../assets/json/fieldMapper.json';

  constructor(private http: HttpClient) { 
    this.getJSON(this._jsonURL).subscribe(data => {
      this.visibleFields = data[this.compName]["visibleFields"];
     });
     this.getJSON(this._jsonFiedMapperURL).subscribe(data => {
      this.fieldMapper = data;
     });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange): void {
    console.log("called here.... changes");
  }

  public getJSON(jsonUrl: string): Observable<any> {
    return this.http.get(jsonUrl);
  }

}
