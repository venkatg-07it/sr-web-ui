import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as JSZip from 'jszip';
import { IFileResponse } from 'src/app/model/IFileResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Output()
  fileResponse = new EventEmitter<IFileResponse[]>();
  
  fieldMapper: any;
  private _jsonURL = './../../../assets/json/fieldMapper.json';

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.fieldMapper = data;
     });
   }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    
    JSZip.loadAsync(event.target.files[0]).then(response => {
      this.loadExcelContent(response.files);
    });

  }

  loadExcelContent(files: {[key: string]: JSZip.JSZipObject;}) {
      let sheetId = 1;
      let contents = [];

      contents.push(files["xl/sharedStrings.xml"].async("string"));
      
      while(true) {
        let sheetName = "xl/worksheets/sheet" + sheetId + ".xml";
        let sheet = files[sheetName];
        if(sheet) {
          contents.push(sheet.async("string"))
        }
        else {
          break;
        }
        sheetId++;
      }
      contents.push(files["xl/styles.xml"].async("string"))

      Promise.all(contents).then(values => {
        let response = this.extractExcelFiles(values);
        this.fileResponse.emit(response);
      });
  }

  extractExcelFiles(contents: string[]): IFileResponse[]{
    let parser = new DOMParser();
    let response: IFileResponse[] = [];
    let sharedStrings: string[] = this.getSharedStringsContent(contents[0], parser);
    let length = contents.length;

    for(let idx = 1; idx < length; idx++) {
      response.push(
        this.getSheetContent(
          contents[idx],
          parser,
          sharedStrings
        )
      );
    }
    return response;
  }
  
  getSharedStringsContent(content: string, parser: DOMParser): string[] {
    let xmlObject = parser.parseFromString(content, "text/xml");
    let childNodes = xmlObject.getElementsByTagName("si");
    let length = childNodes.length;
    let sharedStrings: string[] = [];  
    for(let idx = 0; idx < length; idx++) {
      let value = childNodes[idx].textContent;
      if(value) {
        sharedStrings.push(value);
      }
    }
    return sharedStrings;
  }

  getSheetContent(content: string, 
                  parser: DOMParser,
                  sharedStrings: string[]): IFileResponse {
    let xmlObject = parser.parseFromString(content, "text/xml");
    let rowNodes = xmlObject.getElementsByTagName("row");
    let response: IFileResponse = {};
    if(rowNodes.length > 0) {
      response = this.getColumnMetaData(rowNodes[0], sharedStrings);
      response.sheetContent = this.getRowDatas(
        rowNodes,
        response.columnCount,
        sharedStrings,
        response.mapperFields
      );
    }

    return response;
  }

  getColumnMetaData(headerRow: Element, sharedStrings: string[]): IFileResponse {
    
    let headerCols = headerRow.getElementsByTagName("c");
    let columnCount = headerCols.length;
    let colKeys = [];
    let colMapper: { [key: string]: string } = {};

    for(let colIdx = 0; colIdx < columnCount; colIdx++) {
      let colVal = headerCols[colIdx].textContent;
      if(colVal) {
        let colTitle = sharedStrings[parseInt(colVal)];
        if(colTitle) {
          colKeys.push(this.fieldMapper[colTitle]);
          colMapper[this.fieldMapper[colTitle]] = colTitle;
        }
        
      }
      
    }
    return {
      columnCount: columnCount,
      mapperFields: colKeys,
      colMapper: colMapper
    }

  }

  getRowDatas(rowNodes: HTMLCollectionOf<Element>,
              columnCount: number = 0,
              sharedStrings: string[],
              colKeys: string[] = []
              ) {
    let rowLength = rowNodes.length;
    let sheetContent = [];

    for(let rowIdx = 1; rowIdx < rowLength; rowIdx++) {
      let colNodes = rowNodes[rowIdx].getElementsByTagName("c");
      
      sheetContent.push(
        this.getRowData(
          colNodes,
          rowIdx,
          columnCount,
          sharedStrings,
          colKeys
        )
      );
    }

    return sheetContent;
  }

  getRowData(colNodes: HTMLCollectionOf<Element>, 
              rowIdx: number, 
              columnCount: number,
              sharedStrings: string[],
              colKeys: string[]
              ) {
    let rIdx = rowIdx + 1;
    let colData: { [key: string]: string } = {};

    for(let colIdx = 0, columnIndex = 0; colIdx < columnCount; colIdx++){
      columnIndex = this.getColumnData(
        colNodes,
        colIdx,
        rIdx,
        columnIndex,
        sharedStrings,
        colKeys,
        colData
      );
    }

    return colData;
  }

  getColumnData(colNodes: HTMLCollectionOf<Element>, 
                colIdx: number, 
                rIdx: number, 
                columnIndex: number,
                sharedStrings: string[],
                colKeys: string[],
                colData: { [key: string]: string }) {
    let cIdx = this.getAlphabetByNumber(colIdx) + rIdx;
    let colNode = colNodes[columnIndex];
    let colValue = "";

    if(colNode && colNode.getAttribute("r") == cIdx) {
      let colContent = colNode.textContent;
      if(colContent) {
        if(colNode.hasAttribute("t")) {
          let value =  sharedStrings[parseInt(colContent)];
          colValue = value ? value : "";
        }
        else {
          colValue = colContent;
        }
        columnIndex++;
      }
      else {
        colValue = "";
      }
      let colKey = colKeys[colIdx];
      if(colKey) {
        colData[colKey] = colValue;
      }
    }
    return columnIndex;
  }

  getAlphabetByNumber(num: number) {
    var ordA = 'A'.charCodeAt(0);
    var ordZ = 'Z'.charCodeAt(0);
    var len = ordZ - ordA + 1;

    var s = "";
    while(num >= 0) {
      s = String.fromCharCode(num % len + ordA) + s;
      num = Math.floor(num / len) - 1;
    }
    return s;
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

}
