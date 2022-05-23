import * as global from 'global'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {
  url=`${global.url}/criterio/`;
  constructor(private http: HttpClient) { }

  public getCriterions():Observable<any>{
    return this.http.get<any>(this.url);
  }

  public post(criterion:any):Observable<any>{
    return this.http.post<any>(`${global.url}/problema/criterios/`,criterion);
  }

  editCriterion(id:string,criterion:any):Observable<any>{
    return this.http.put(this.url,criterion)
  }
}
