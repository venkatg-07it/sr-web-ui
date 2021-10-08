import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  public getJSON(jsonUrl: string): Observable<any> {
    return this.http.get(jsonUrl);
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

  getBulkAsyncData(reqests: Observable<any>[]): Observable<any[]>{
    return forkJoin(reqests);
  }
}
