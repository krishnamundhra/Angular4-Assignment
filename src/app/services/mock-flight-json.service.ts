import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockFlightJSONService {

  constructor(private httpClient: HttpClient) { }

  public getMockData() {

    const url = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';
    return this.httpClient.get(url);
  }
}
