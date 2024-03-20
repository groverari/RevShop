import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Owner } from '../../models/owner';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string): Observable<User> {
    const data = {
      email: email,
      password: password,
    };
    return this.http.post<any>(this.baseUrl + 'users/login', data);
  }
  ownerLogin(email: string, password: string): Observable<Owner> {
    const data = {
      email: email,
      password: password,
    };
    return this.http.post<any>(this.baseUrl + 'owners/login', data);
  }
}
