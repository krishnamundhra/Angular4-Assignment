import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MockFlightJSONService {

  constructor(private httpClient: HttpClient) { }

  public getMockData(): Observable<any[]> {

    const url = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';
    return this.httpClient.get<any[]>(url);
  }
}
