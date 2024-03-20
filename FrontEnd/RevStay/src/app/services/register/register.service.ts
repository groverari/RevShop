import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../../models/user';
import { Owner } from '../../models/owner';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
})};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  userRegistration(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    return this.http.post<User>(this.baseUrl + 'users/register', data, httpOptions);
  }

  ownerRegistration(email: string, password: string, firstName: string, lastName: string): Observable<Owner> {
    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    return this.http.post<Owner>(this.baseUrl + 'owners/register', data, httpOptions);
  }
}

