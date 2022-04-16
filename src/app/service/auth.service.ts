import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../models/new-user';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = `${global.url}/auth/`;
  url = `${global.url}/usuario/`;

  constructor(private httpClient: HttpClient) { }

  public new(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUser);
  }

  public getUsers():Observable<any> {
    console.log('entre');
    
    return this.httpClient.get<any>(this.url);
  }
}
