import * as global from 'global'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProblemService {
  url=`${global.url}/problema/`;
  constructor(private http: HttpClient) { }

  // public getProblems():Observable<any>{
  //   return this.http.get<any>(this.url);
  // }

  public getProblems(){
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this.url, {
      headers: header
    });
  }

  public post(prblema:any):Observable<any>{
    return this.http.post<any>(this.url, prblema)
  }

  editProblem(id:string,prblema:any):Observable<any>{
      return this.http.put(`${global.url}/problema`,prblema)
  }

  getProblem(id:string): Observable<any>{
    return this.http.get(this.url+id)
  }
  
}