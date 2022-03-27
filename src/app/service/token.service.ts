import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
}
