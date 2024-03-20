import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options } from '../../models/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  create<T>(url: string, body: any, options?: Options): Observable<T> {
    return this.httpClient.post(
      this.baseUrl + url,
      body,
      options
    ) as Observable<T>;
  }

  // this get method is to communicate with the server and do get requests
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + url, options) as Observable<T>;
  }

  update<T>(url: string, body: any, options?: Options): Observable<T> {
    return this.httpClient.put<T>(
      this.baseUrl + url,
      body,
      options
    ) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(
      this.baseUrl + url,
      options
    ) as Observable<T>;
  }
}
