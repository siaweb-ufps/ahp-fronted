import * as global from 'global'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {
  url=`${global.url}/criterio/`;
  uri=`${global.url}/problema/criterios/`;
  constructor(private http: HttpClient) { }

  public getAllCriterions():Observable<any>{
    return this.http.get<any>(this.url);
  }

  public getCriterions(idProblem:any):Observable<any>{
    return this.http.get<any>(`${this.uri}${idProblem}`);
  }

  public post(idProblem:any,criterion:any):Observable<any>{
    return this.http.post<any>(`${this.uri}${idProblem}`, criterion);
  }

  editCriterion(id:string,criterion:any):Observable<any>{
    return this.http.put(this.url,criterion)
  }
}
