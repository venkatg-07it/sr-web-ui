import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExcelUpload } from '../model/RequestBody';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(url: string, reqBody: IExcelUpload): Observable<any> {
    return this.http.post(url, reqBody);
  }
}
