import { Injectable } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { IFieldConfig } from '../model/i-field-config';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private utilService: UtilService) { }

  downloadExcel(fileName: string, data: any[], headers: string[], fieldDetails: any) {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');

    this.bindHeaders(headers, worksheet);
    this.bindData(data, headers, fieldDetails, worksheet);


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName + '.xlsx');
    })
    
  } 

  bindHeaders(headers: string[], worksheet: Worksheet) {
    let idx = 0;
    for(let header of headers) {
      let cellIndex = this.utilService.getAlphabetByNumber(idx);
      let headerRow = worksheet.getCell(cellIndex + '1');
      headerRow.value = header;
      headerRow.alignment = { 
        vertical: 'middle', 
        horizontal: 'center',
        wrapText: true
      }
      
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      headerRow.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      }

      worksheet.getColumn((idx + 1)).width = 20;
      idx++;
    }
  }

  bindData(data: any[], headers: string[], fieldDetails: any, worksheet: Worksheet) {
    let idx = 2;
    
    for(let item of data) {
      let cidx = 0;
      for(let header of headers) {
        let fieldObject: IFieldConfig = fieldDetails[header];
        
        let value = item[fieldObject.name];

        let cellIndex = this.utilService.getAlphabetByNumber(cidx);
        let headerRow = worksheet.getCell(cellIndex + idx);
        headerRow.value = value;
        headerRow.alignment = { 
          vertical: 'middle',         
          wrapText: true
        }
    
        headerRow.font = {
          size: 12,
        }
        cidx++;
      }
      idx++;
    }
  }
}
