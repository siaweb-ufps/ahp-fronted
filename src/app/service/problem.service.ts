import * as global from 'global'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class ProblemService {
  url=`${global.url}/problema/`;
  constructor(private http: HttpClient) { }

  public getProblems():Observable<any>{
    return this.http.get<any>(this.url);
  }

  getProblem(id:string): Observable<any>{
    return this.http.get(this.url+id)
  }
}