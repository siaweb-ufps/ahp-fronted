import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QulifyService {

  url = `${global.url}/`;

  constructor(private httpClient:HttpClient) { }


  public getPairsCriterion(tokenProblema:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/criteriosComparados/"+tokenProblema);
  }

  public getAccessProblem(tokenProblem:string, emailDecisor:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/accesoproblema/"+tokenProblem+"/"+emailDecisor);
  }
  
 public getCriterionProblem(tokenProblem:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/criterios/"+tokenProblem);
  }
}
