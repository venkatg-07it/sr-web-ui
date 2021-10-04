import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  public getJSON(jsonUrl: string): Observable<any> {
    return this.http.get(jsonUrl);
  }
}
