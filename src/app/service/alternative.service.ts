import * as global from 'global'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlternativeService {
  url=`${global.url}/alternativa/`;
  uri=`${global.url}/problema/alternativas/`;

  constructor(private http: HttpClient) { }

  public getAllAlternatives():Observable<any>{
    return this.http.get<any>(this.url);
  }
  public getAlternatives(idProblem:any):Observable<any>{
    return this.http.get<any>(`${this.uri}${idProblem}`);
  }

  public post(idProblem:any, alternative:any):Observable<any>{
    return this.http.post<any>(`${this.uri}${idProblem}`,alternative);
  }

  editAlternative(id:string,alternative:any):Observable<any>{
    return this.http.put(this.url,alternative)
  }
}
